const {submitPostRequest, submitGetRequest} = require("./request")
const {ensureValidRacingEventExists} = require("./RacingEvents")
const {ensureValidImageExists} = require("./Images")

exports.ensureValidRacingSeriesExists = async function ensureValidRacingSeriesExists() {
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

exports.createRacingSeries = async function createRacingSeries() {
    return submitPostRequest("/racing-series", {
        name: 'Formula 1',
    })
}

exports.getAllRacingSeries = async function getAllRacingSeries() {
    return submitGetRequest("/racing-series")
}

exports.ensureRacingSeriesHasRacingEventRelationshipExists = async function ensureRacingSeriesHasRacingEventRelationshipExists() {
    await this.ensureValidRacingSeriesExists()
    await ensureValidRacingEventExists()
    await this.createRacingSeriesHasRacingEventRelationship(bru.getEnvVar('validRacingSeriesId'), bru.getEnvVar('validRacingEventId'))
}

exports.createRacingSeriesHasRacingEventRelationship = async function createRacingSeriesHasRacingEventRelationship(racingSeriesId, racingEventId) {
    return submitPostRequest("/racing-series/" + racingSeriesId + "/has-racing-event/" + racingEventId)
}

exports.ensureRacingSeriesHasImageRelationshipExists = async function ensureRacingSeriesHasImageRelationshipExists() {
    await this.ensureValidRacingSeriesExists()
    await ensureValidImageExists()
    await this.createRacingSeriesHasImageRelationship(bru.getEnvVar('validRacingSeriesId'), bru.getEnvVar('validImageId'))
}

exports.createRacingSeriesHasImageRelationship = async function createRacingSeriesHasImageRelationship(racingSeriesId, imageId) {
    return submitPostRequest("/racing-series/" + racingSeriesId + "/has-image/" + imageId)
}

exports.ensureRacingSeriesHasPrimeImageRelationshipExists = async function ensureRacingSeriesHasPrimeImageRelationshipExists() {
    await this.ensureValidRacingSeriesExists()
    await ensureValidImageExists()
    await this.createRacingSeriesHasPrimeImageRelationship(bru.getEnvVar('validRacingSeriesId'), bru.getEnvVar('validImageId'))
}

exports.createRacingSeriesHasPrimeImageRelationship = async function createRacingSeriesHasPrimeImageRelationship(racingSeriesId, imageId) {
    return submitPostRequest("/racing-series/" + racingSeriesId + "/has-prime-image/" + imageId)
}
