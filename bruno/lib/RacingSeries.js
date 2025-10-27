const {submitPostRequest, submitGetRequest} = require("./request")
const {ensureValidRacingEventExists} = require("./RacingEvents")
const {ensureValidImageExists} = require("./Images")

async function ensureValidRacingSeriesExists() {
    if (!bru.getEnvVar('validRacingSeriesId')) {
        const nodeList = await getAllRacingSeries()
        if (nodeList.length > 0) {
            bru.setEnvVar("validRacingSeriesId", nodeList[0].data.id)
        } else {
            const newNode = await createRacingSeries()
            bru.setEnvVar("validRacingSeriesId", newNode.data.id)
        } //
    }
}

exports.ensureValidRacingSeriesExists = ensureValidRacingSeriesExists

async function createRacingSeries() {
    return submitPostRequest("/racing-series", {
        name: 'Formula 1',
    })
}

exports.createRacingSeries = createRacingSeries

async function getAllRacingSeries() {
    return submitGetRequest("/racing-series")
}

exports.getAllRacingSeries = getAllRacingSeries

async function ensureRacingSeriesHasRacingEventRelationshipExists() {
    await ensureValidRacingSeriesExists()
    await ensureValidRacingEventExists()
    await createRacingSeriesHasRacingEventRelationship(bru.getEnvVar('validRacingSeriesId'), bru.getEnvVar('validRacingEventId'))
}

exports.ensureRacingSeriesHasRacingEventRelationshipExists = ensureRacingSeriesHasRacingEventRelationshipExists

async function createRacingSeriesHasRacingEventRelationship(racingSeriesId, racingEventId) {
    return submitPostRequest("/racing-series/" + racingSeriesId + "/has-racing-event/" + racingEventId)
}

exports.createRacingSeriesHasRacingEventRelationship = createRacingSeriesHasRacingEventRelationship

async function ensureRacingSeriesHasImageRelationshipExists() {
    await ensureValidRacingSeriesExists()
    await ensureValidImageExists()
    await createRacingSeriesHasImageRelationship(bru.getEnvVar('validRacingSeriesId'), bru.getEnvVar('validImageId'))
}

exports.ensureRacingSeriesHasImageRelationshipExists = ensureRacingSeriesHasImageRelationshipExists

async function createRacingSeriesHasImageRelationship(racingSeriesId, imageId) {
    return submitPostRequest("/racing-series/" + racingSeriesId + "/has-image/" + imageId)
}

exports.createRacingSeriesHasImageRelationship = createRacingSeriesHasImageRelationship

async function ensureRacingSeriesHasPrimeImageRelationshipExists() {
    await ensureValidRacingSeriesExists()
    await ensureValidImageExists()
    await createRacingSeriesHasPrimeImageRelationship(bru.getEnvVar('validRacingSeriesId'), bru.getEnvVar('validImageId'))
}

exports.ensureRacingSeriesHasPrimeImageRelationshipExists = ensureRacingSeriesHasPrimeImageRelationshipExists

async function createRacingSeriesHasPrimeImageRelationship(racingSeriesId, imageId) {
    return submitPostRequest("/racing-series/" + racingSeriesId + "/has-prime-image/" + imageId)
}

exports.createRacingSeriesHasPrimeImageRelationship = createRacingSeriesHasPrimeImageRelationship
