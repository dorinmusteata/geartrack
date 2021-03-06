'use strict';

const sprintf = require('sprintf')
const request = require('requestretry').defaults({ maxAttempts: 2, retryDelay: 1000 })
const parser = require('cheerio')
const utils = require('./utils')
const moment = require('moment-timezone')
const zone = "Asia/Hong_Kong" // +8h

const URL = 'http://www.sky56.cn/track/track/result?tracking_number=%s'

const sky = {}

/**
 * Get Sky56 info
 * Supports PQ... and NL... LVS.. SYB.. ids
 * Async
 *
 * @param id
 * @param callback(Error, SkyInfo)
 */
sky.getInfo = function (id, callback) {
    request(sprintf(URL, id), function (error, response, body) {
        if (error || response.statusCode != 200) {
            return callback(utils.errorDown(id))
        }

        let json = null
        try {
            json = JSON.parse(body)
        } catch (e) {
            return callback(utils.errorParser(id, e.message))
        }

        // Not found
        if (json.message.indexOf('No result found for your query.') != -1 ||
            (json.message == '<br/>' && json.List && json.List && json.List.row == null )) {
           return callback(utils.errorNoData())
        }

        let entity = null
        try {
            switch(id.charAt(0)) {
                case 'N': // Netherlands Post surface mail
                case 'L': // Bpost is the same
                case 'S': // Malasya Pos
                case 'G': // Switzerland Post Unregistered
                case 'Q': // Sweden Registered
                    entity = createNLSkyEntity(id, json)
                    break
                default: // Spain express, correos line
                    entity = createSkyEntity(id, json)

                    // if(entity.messages.length == 0) // we should have messages!
                    //     return callback(utils.errorEmpty())

                    break
            }

            entity.retries = response.attempts
        } catch (error) {
            return callback(utils.errorParser(id, error.message))
        }

        callback(null, entity)
    })
}

/*
|--------------------------------------------------------------------------
| Correos Line Parse
|--------------------------------------------------------------------------
*/
/**
 * Create SkyInfo entity from json
 * @param id
 * @param json
 */
function createSkyEntity(id, json) {
    let infos = json.message.split('<br/>')
    let messages = infos.splice(infos.length - 4,4)
    let table = messages[messages.length-1]

    let states = parseStatusTable(table)

    let parsedMessages = infos.map(message => {
        let idx1 = message.indexOf(" ")
        let idx2 = message.indexOf(" ", idx1+1)
        let date = moment.tz(message.substr(0, idx2), "YYYY-MM-DD HH:mm:ss", zone).format()
        let m = message.substr(idx2 + 1, message.length)
        return {
            date: date,
            status: m.trim()
        }
    })

    return new SkyInfo({
        id: id,
        'messages': parsedMessages.reverse(),
        'status': states
    })
}


function SkyInfo(obj) {
    this.id = obj.id
    this.messages = obj.messages
    this.status = obj.status
    this.trackerWebsite = sky.getLink(this.id)

    this.isNL = () => {
        return this.id.charAt(0) == 'N'
    }
}

sky.getLink = function (id) {
    return "http://www.sky56.cn/english/track/index"
}

/*
|--------------------------------------------------------------------------
| Netherlands Post surface mail Parse
|--------------------------------------------------------------------------
*/
function createNLSkyEntity(id, json) {
    let infos = json.message.replace('，', ',').split('<br/>').filter(m => m.length != 0)

    let messages = null

    if(infos[0].indexOf("span") !== -1) { // title
        infos.splice(0, 1) //remove first element
    }

    if(infos[0].indexOf("table") !== -1) {
        let table = infos.splice(0, 1) //remove first element
        messages = parseStatusTable(table[0])
    }

    let parsedStatus = infos.map(message => {
        let idx1 = message.indexOf(",")
        let idx2 = message.indexOf("--", idx1+1)
        let area = message.substr(0, idx1)
        let status = message.substr(idx1+1, idx2 - idx1 - 1)
        let date = moment.tz(message.substr(idx2 + 2), "DD-MMM-YYYY hh:mm a", zone).format()
        return {
            area: area,
            status: status.trim().capitalizeFirstLetter(),
            date: date
        }
    })

    return new SkyInfo({
        id: id,
        status: parsedStatus.reverse(),
        messages: messages
    })
}

/*
|--------------------------------------------------------------------------
| Utils
|--------------------------------------------------------------------------
*/
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

function parseStatusTable(tableHtml) {
    let $ = parser.load(tableHtml)

    let states = []
    const fields = ['date', 'area', 'status']
    $('tr').each(function (i) {
        if(i == 0) return

        let state = {}

        $(this).children().each(function (s) {
            let text = $(this).text()

            if(text == 'En tr?nsito') //remove ?
                text = 'En tránsito'

            if(s == 0)
                text = moment.tz(text, "YYYY-MM-DD HH:mm:ss", zone).format()

            state[fields[s]] = text
        })
        states.push(state)
    })

    return states.sort((a, b) => {
        let dateA = moment(a.date),
            dateB = moment(b.date)

        return dateA < dateB
    })
}

module.exports = sky