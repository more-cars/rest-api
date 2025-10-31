const {submitPostRequest, submitGetRequest} = require("./request")
const {ensureValidRacingEventExists} = require("./RacingEvents")
const {ensureValidImageExists} = require("./Images")

exports.ensureValidRacingSeriesExists = async function () {
    if (!bru.getEnvVar('validRacingSeriesId')) {
        const nodeList = await this.getAllRacingSeries()
        if (nodeList.length > 0) {
            bru.setEnvVar("validRacingSeriesId", nodeList[0].data.id)
        } else {
            const newNode = await this.createRacingSeries()
            bru.setEnvVar("validRacingSeriesId", newNode.data.id)
        } //
    }
}

exports.createRacingSeries = async function () {
    return submitPostRequest("/racing-series", {
        name: 'Formula 1',
    })
}

exports.getAllRacingSeries = async function () {
    return submitGetRequest("/racing-series")
}

exports.ensureRacingSeriesHasRacingEventRelationshipExists = async function () {
    await this.ensureValidRacingSeriesExists()
    await ensureValidRacingEventExists()
    await this.createRacingSeriesHasRacingEventRelationship(bru.getEnvVar('validRacingSeriesId'), bru.getEnvVar('validRacingEventId'))
}

exports.createRacingSeriesHasRacingEventRelationship = async function (racingSeriesId, racingEventId) {
    return submitPostRequest("/racing-series/" + racingSeriesId + "/has-racing-event/" + racingEventId)
}

exports.ensureRacingSeriesHasImageRelationshipExists = async function () {
    await this.ensureValidRacingSeriesExists()
    await ensureValidImageExists()
    await this.createRacingSeriesHasImageRelationship(bru.getEnvVar('validRacingSeriesId'), bru.getEnvVar('validImageId'))
}

exports.createRacingSeriesHasImageRelationship = async function (racingSeriesId, imageId) {
    return submitPostRequest("/racing-series/" + racingSeriesId + "/has-image/" + imageId)
}

exports.ensureRacingSeriesHasPrimeImageRelationshipExists = async function () {
    await this.ensureValidRacingSeriesExists()
    await ensureValidImageExists()
    await this.createRacingSeriesHasPrimeImageRelationship(bru.getEnvVar('validRacingSeriesId'), bru.getEnvVar('validImageId'))
}

exports.createRacingSeriesHasPrimeImageRelationship = async function (racingSeriesId, imageId) {
    return submitPostRequest("/racing-series/" + racingSeriesId + "/has-prime-image/" + imageId)
}
