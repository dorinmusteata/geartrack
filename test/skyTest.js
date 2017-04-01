const assert = require('chai').assert

const sky = require('../src/skyTracker')
const moment = require('moment-timezone')
const zone = "Asia/Hong_Kong"

describe('Sky 56', function() {
    this.timeout(0)

    describe('#Malasya Post', function() {
        it('should extract the messages from the website with success', function(done) {
            const id = 'SYBPL01957855'
            sky.getInfo(id, (err, info) => {
                assert.isNull(err)

                assert.equal(info.id, id)
                assert.deepEqual(info.status, [
                    {
                        "area": "PORTUGAL",
                        "status": "The transfer of customs",
                        "date": "2017-01-06T23:37:00+08:00"
                    },
                    {
                        "area": "PORTUGAL",
                        "status": "Arrived",
                        "date": "2017-01-06T19:57:00+08:00"
                    },
                    {
                        "area": "Transit Center",
                        "status": "Left hand navigation",
                        "date": "2016-12-25T19:57:00+08:00"
                    },
                    {
                        "area": "Exchange Bureau",
                        "status": "Have been exported directly",
                        "date": "2016-12-25T14:23:00+08:00"
                    },
                    {
                        "area": "Exchange Bureau",
                        "status": "Have been exported to open",
                        "date": "2016-12-24T20:20:00+08:00"
                    },
                    {
                        "area": "Small package Center",
                        "status": "Left",
                        "date": "2016-12-23T12:20:00+08:00"
                    },
                    {
                        "area": "Parcel centre",
                        "status": "Sealing",
                        "date": "2016-12-23T10:47:00+08:00"
                    },
                    {
                        "area": "Small package Center",
                        "status": "Receive",
                        "date": "2016-12-23T07:47:00+08:00"
                    },
                    {
                        "area": "Electronic information",
                        "status": "Receive",
                        "date": "2016-12-23T05:47:00+08:00"
                    }
                ])
                assert.deepEqual(info.messages, null)

                console.log(id + ' attempts: ' + info.retries)
                done()
            })

        });
    });

    describe('#Netherlands Post', function() {
        it('should extract the messages from the website with success', function(done) {
            const id = 'NL14812386123607'
            sky.getInfo(id, (err, info) => {
                assert.isNull(err)

                assert.equal(info.id, id)
                assert.deepEqual(info.status, [
                    {
                        "area": "PORTUGAL",
                        "status": "The transfer of customs",
                        "date": "2016-12-24T01:00:00+08:00"
                    },
                    {
                        "area": "PORTUGAL",
                        "status": "Arrived",
                        "date": "2016-12-23T21:20:00+08:00"
                    },
                    {
                        "area": "Transit Center",
                        "status": "Left hand navigation",
                        "date": "2016-12-11T21:20:00+08:00"
                    },
                    {
                        "area": "Exchange Bureau",
                        "status": "Have been exported directly",
                        "date": "2016-12-11T15:46:00+08:00"
                    },
                    {
                        "area": "Exchange Bureau",
                        "status": "Have been exported to open",
                        "date": "2016-12-10T21:43:00+08:00"
                    },
                    {
                        "area": "Small package Center",
                        "status": "Left",
                        "date": "2016-12-09T13:43:00+08:00"
                    },
                    {
                        "area": "Parcel centre",
                        "status": "Sealing",
                        "date": "2016-12-09T12:10:00+08:00"
                    },
                    {
                        "area": "Small package Center",
                        "status": "Receive",
                        "date": "2016-12-09T09:10:00+08:00"
                    },
                    {
                        "area": "Electronic information",
                        "status": "Receive",
                        "date": "2016-12-09T07:10:00+08:00"
                    }
                ])
                assert.deepEqual(info.messages, null)

                console.log(id + ' attempts: ' + info.retries)
                done()
            })

        });
    });

    describe('#Priority Line', function () {
        it('should extract the messages from the website with success', function (done) {
            const id = 'PQ4F6P0702945760181750M'
            sky.getInfo(id, (err, info) => {
                assert.isNull(err)

                assert.equal(info.id, id)
                assert.deepEqual(info.status, [
                    {
                        "date": "2016-12-30T00:00:00+08:00",
                        "area": "",
                        "status": "Entregado"
                    },
                    {
                        "date": "2016-12-27T00:00:00+08:00",
                        "area": "",
                        "status": "En proceso de entrega"
                    },
                    {
                        "date": "2016-12-23T00:00:00+08:00",
                        "area": "",
                        "status": "En tránsito"
                    },
                    {
                        "date": "2016-12-19T00:00:00+08:00",
                        "area": "",
                        "status": "Admitido"
                    },
                    {
                        "date": "2016-12-02T00:00:00+08:00",
                        "area": "",
                        "status": "Pre-registrado"
                    }
                ])
                assert.deepEqual(info.messages, [
                    {
                        "date": "2016-12-09T12:11:00+08:00",
                        "status": "Information sent to Spain"
                    },
                    {
                        "date": "2016-12-08T03:45:00+08:00",
                        "status": "United Kingdom Lonton Sorting Centre"
                    },
                    {
                        "date": "2016-12-06T22:10:00+08:00",
                        "status": "Parcel is leaving Hong Kong Airport"
                    },
                    {
                        "date": "2016-12-05T10:00:00+08:00",
                        "status": "Parcel departure arrive in HongKong Sorting Centre"
                    },
                    {
                        "date": "2016-12-04T19:12:00+08:00",
                        "status": "Parcel departure in Shenzhen Sorting Centre"
                    },
                    {
                        "date": "2016-12-02T19:12:00+08:00",
                        "status": "Parcel departure in Shenzhen Sorting Centre"
                    }
                ])

                console.log(id + ' attempts: ' + info.retries)
                done()
            })

        });

        // it('should correct status en tra?nsito', function(done) {
        //     const id = 'PQ4F6P0703673180181750T'
        //     sky.getInfo(id, (err, info) => {
        //         assert.isNull(err)
        //
        //         assert.equal('En tránsito', info.status[info.status.length-3].status)
        //
        //         console.log(id + ' attempts: ' + info.retries)
        //         done()
        //     })
        //
        // });

        // it('should sort status by date', function(done) {
        //     const id = 'PQ4F6P0702945760181750M'
        //     sky.getInfo(id, (err, info) => {
        //         assert.isNull(err)
        //
        //         assert.equal('Entregado', info.status[0].status)
        //
        //         console.log(id + ' attempts: ' + info.retries)
        //         done()
        //     })
        //
        // });
    });

    describe('#Bpost International', function() {
        it('should extract the messages from the website with success', function(done) {
            const id = 'LVS1376360000761593'
            sky.getInfo(id, (err, info) => {
                assert.isNull(err)

                assert.equal(info.id, id)

                assert.deepEqual(info.status, [
                    {
                        "area": "PORTUGAL",
                        "status": "The transfer of customs",
                        "date": "2017-03-02T00:18:00+08:00"
                    },
                    {
                        "area": "PORTUGAL",
                        "status": "Arrived",
                        "date": "2017-03-01T20:38:00+08:00"
                    },
                    {
                        "area": "Transit Center",
                        "status": "Left hand navigation",
                        "date": "2017-02-17T20:38:00+08:00"
                    },
                    {
                        "area": "Exchange Bureau",
                        "status": "Have been exported directly",
                        "date": "2017-02-17T15:04:00+08:00"
                    },
                    {
                        "area": "Exchange Bureau",
                        "status": "Have been exported to open",
                        "date": "2017-02-16T21:01:00+08:00"
                    },
                    {
                        "area": "Small package Center",
                        "status": "Left",
                        "date": "2017-02-15T13:01:00+08:00"
                    },
                    {
                        "area": "Parcel centre",
                        "status": "Sealing",
                        "date": "2017-02-15T11:28:00+08:00"
                    }
                ])

                assert.deepEqual(info.messages, [
                    {
                        "date": "2017-02-23T20:17:29+08:00",
                        "area": "",
                        "status": "Your shipment has been delivered to the postal operator of the country of destination and will be delivered in the coming days."
                    },
                    {
                        "date": "2017-02-22T09:41:02+08:00",
                        "area": "",
                        "status": "Departure to country of destination"
                    },
                    {
                        "date": "2017-02-21T19:06:27+08:00",
                        "area": "",
                        "status": "Parcel is handled"
                    },
                    {
                        "date": "2017-02-18T13:00:28+08:00",
                        "area": "",
                        "status": "Arrival at export hub"
                    },
                    {
                        "date": "2017-02-17T09:41:28+08:00",
                        "area": "",
                        "status": "Item is ready for transport"
                    },
                    {
                        "date": "2017-02-17T08:41:28+08:00",
                        "area": "",
                        "status": "Item is announced / bpost received the information"
                    }
                ])

                console.log(id + ' attempts: ' + info.retries)
                done()
            })

        });
    });

    describe('#Switzerland Post Unregistered', function() {
        it('should extract the messages from the website with success', function(done) {
            const id = 'GEGMY00054570'
            sky.getInfo(id, (err, info) => {
                assert.isNull(err)

                assert.equal(info.id, id)
                assert.equal(info.messages, null)
                assert.deepEqual(info.status, [
                    {
                        "area": "PORTUGAL",
                        "status": "The transfer of customs",
                        "date": "2017-03-24T14:44:00+08:00"
                    },
                    {
                        "area": "PORTUGAL",
                        "status": "Arrived",
                        "date": "2017-03-24T11:04:00+08:00"
                    },
                    {
                        "area": "Transit Center",
                        "status": "Left hand navigation",
                        "date": "2017-03-12T11:04:00+08:00"
                    },
                    {
                        "area": "Exchange Bureau",
                        "status": "Have been exported directly",
                        "date": "2017-03-12T05:30:00+08:00"
                    },
                    {
                        "area": "Exchange Bureau",
                        "status": "Have been exported to open",
                        "date": "2017-03-11T11:27:00+08:00"
                    },
                    {
                        "area": "Small package Center",
                        "status": "Left",
                        "date": "2017-03-10T03:27:00+08:00"
                    },
                    {
                        "area": "Parcel centre",
                        "status": "Sealing",
                        "date": "2017-03-10T01:54:00+08:00"
                    },
                    {
                        "area": "Small package Center",
                        "status": "Receive",
                        "date": "2017-03-09T22:54:00+08:00"
                    },
                    {
                        "area": "Electronic information",
                        "status": "Receive",
                        "date": "2017-03-09T20:54:00+08:00"
                    }
                ])

                console.log(id + ' attempts: ' + info.retries)
                done()
            })

        });

        it('should extract the messages from the website with success', function(done) {
            const id = 'SB3000050456'
            sky.getInfo(id, (err, info) => {
                assert.isNull(err)

                assert.equal(info.messages, null)

                assert(info.status.length >= 5)
                assert.equal(info.status[0].area, 'PORTUGAL')

                console.log(id + ' attempts: ' + info.retries)
                done()
            })

        });
    });


    it('should fail to extract', function(done) {
        const id = '423423424'
        sky.getInfo(id, (err, info) => {
            assert.isNotNull(err)

            done()
        })

    });
});