const {submitPostRequest, submitGetRequest} = require("./request")
const {ensureValidRacingEventExists} = require("./RacingEvents")
const {ensureValidImageExists} = require("./Images")

async function ensureValidRacingSessionExists() {
    if (!bru.getEnvVar('validRacingSessionId')) {
        const nodeList = await getAllRacingSessions()
        if (nodeList.length > 0) {
            bru.setEnvVar("validRacingSessionId", nodeList[0].data.id)
        } else {
            const newNode = await createRacingSession()
            bru.setEnvVar("validRacingSessionId", newNode.data.id)
        } //
    }
}

exports.ensureValidRacingSessionExists = ensureValidRacingSessionExists

async function getAllRacingSessions() {
    return submitGetRequest("/racing-sessions")
}

exports.getAllRacingSessions = getAllRacingSessions

async function createRacingSession() {
    return submitPostRequest("/racing-sessions", {
        name: 'Grand Prix',
    })
}

exports.createRacingSession = createRacingSession

async function ensureRacingSessionBelongsToRacingEventRelationshipExists() {
    await ensureValidRacingSessionExists()
    await ensureValidRacingEventExists()
    await createRacingSessionBelongsToRacingEventRelationship(bru.getEnvVar('validRacingSessionId'), bru.getEnvVar('validRacingEventId'))
}

exports.ensureRacingSessionBelongsToRacingEventRelationshipExists = ensureRacingSessionBelongsToRacingEventRelationshipExists

async function createRacingSessionBelongsToRacingEventRelationship(racingSessionId, racingEventId) {
    return submitPostRequest("/racing-sessions/" + racingSessionId + "/belongs-to-racing-event/" + racingEventId)
}

exports.createRacingSessionBelongsToRacingEventRelationship = createRacingSessionBelongsToRacingEventRelationship

async function ensureRacingSessionHasImageRelationshipExists() {
    await ensureValidRacingSessionExists()
    await ensureValidImageExists()
    await createRacingSessionHasImageRelationship(bru.getEnvVar('validRacingSessionId'), bru.getEnvVar('validImageId'))
}

exports.ensureRacingSessionHasImageRelationshipExists = ensureRacingSessionHasImageRelationshipExists

async function createRacingSessionHasImageRelationship(racingSessionId, imageId) {
    return submitPostRequest("/racing-sessions/" + racingSessionId + "/has-image/" + imageId)
}

exports.createRacingSessionHasImageRelationship = createRacingSessionHasImageRelationship

async function ensureRacingSessionHasPrimeImageRelationshipExists() {
    await ensureValidRacingSessionExists()
    await ensureValidImageExists()
    await createRacingSessionHasPrimeImageRelationship(bru.getEnvVar('validRacingSessionId'), bru.getEnvVar('validImageId'))
}

exports.ensureRacingSessionHasPrimeImageRelationshipExists = ensureRacingSessionHasPrimeImageRelationshipExists

async function createRacingSessionHasPrimeImageRelationship(racingSessionId, imageId) {
    return submitPostRequest("/racing-sessions/" + racingSessionId + "/has-prime-image/" + imageId)
}

exports.createRacingSessionHasPrimeImageRelationship = createRacingSessionHasPrimeImageRelationship
