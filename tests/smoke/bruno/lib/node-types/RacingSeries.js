const {post} = require("../apiRequest.js")

exports.createHasRacingEventRelationship = async function () {
    await post("/racing-series/" + bru.getEnvVar('validRacingSeriesId') + "/has-racing-event/" + bru.getEnvVar('validRacingEventId'))
}

exports.createHasImageRelationship = async function () {
    await post("/racing-series/" + bru.getEnvVar('validRacingSeriesId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/racing-series/" + bru.getEnvVar('validRacingSeriesId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/racing-series", {
        name: 'Dummy Racing Series',
    })
    const racingSeries = response.data
    bru.setEnvVar('valid' + prefix + 'RacingSeriesId', racingSeries.id)

    return racingSeries
}
