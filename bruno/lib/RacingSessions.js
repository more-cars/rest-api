const {submitPostRequest, submitGetRequest} = require("./request")
const {ensureValidRacingEventExists} = require("./RacingEvents")
const {ensureValidImageExists} = require("./Images")
const {ensureValidSessionResultExists} = require("./SessionResults")

exports.ensureValidRacingSessionExists = async function ensureValidRacingSessionExists() {
    if (!bru.getEnvVar('validRacingSessionId')) {
        const nodeList = await this.getAllRacingSessions()
        if (nodeList.length > 0) {
            bru.setEnvVar("validRacingSessionId", nodeList[0].data.id)
        } else {
            const newNode = await this.createRacingSession()
            bru.setEnvVar("validRacingSessionId", newNode.data.id)
        } //
    }
}

exports.getAllRacingSessions = async function getAllRacingSessions() {
    return submitGetRequest("/racing-sessions")
}

exports.createRacingSession = async function createRacingSession() {
    return submitPostRequest("/racing-sessions", {
        name: 'Grand Prix',
    })
}

exports.ensureRacingSessionBelongsToRacingEventRelationshipExists = async function ensureRacingSessionBelongsToRacingEventRelationshipExists() {
    await this.ensureValidRacingSessionExists()
    await ensureValidRacingEventExists()
    await this.createRacingSessionBelongsToRacingEventRelationship(bru.getEnvVar('validRacingSessionId'), bru.getEnvVar('validRacingEventId'))
}

exports.createRacingSessionBelongsToRacingEventRelationship = async function createRacingSessionBelongsToRacingEventRelationship(racingSessionId, racingEventId) {
    return submitPostRequest("/racing-sessions/" + racingSessionId + "/belongs-to-racing-event/" + racingEventId)
}

exports.ensureRacingSessionHasImageRelationshipExists = async function ensureRacingSessionHasImageRelationshipExists() {
    await this.ensureValidRacingSessionExists()
    await ensureValidImageExists()
    await this.createRacingSessionHasImageRelationship(bru.getEnvVar('validRacingSessionId'), bru.getEnvVar('validImageId'))
}

exports.createRacingSessionHasImageRelationship = async function createRacingSessionHasImageRelationship(racingSessionId, imageId) {
    return submitPostRequest("/racing-sessions/" + racingSessionId + "/has-image/" + imageId)
}

exports.ensureRacingSessionHasPrimeImageRelationshipExists = async function ensureRacingSessionHasPrimeImageRelationshipExists() {
    await this.ensureValidRacingSessionExists()
    await ensureValidImageExists()
    await this.createRacingSessionHasPrimeImageRelationship(bru.getEnvVar('validRacingSessionId'), bru.getEnvVar('validImageId'))
}

exports.createRacingSessionHasPrimeImageRelationship = async function createRacingSessionHasPrimeImageRelationship(racingSessionId, imageId) {
    return submitPostRequest("/racing-sessions/" + racingSessionId + "/has-prime-image/" + imageId)
}

exports.ensureRacingSessionHasSessionResultRelationshipExists = async function ensureRacingSessionHasSessionResultRelationshipExists() {
    await this.ensureValidRacingSessionExists()
    await ensureValidSessionResultExists()
    await this.createRacingSessionHasSessionResultRelationship(bru.getEnvVar('validRacingSessionId'), bru.getEnvVar('validSessionResultId'))
}

exports.createRacingSessionHasSessionResultRelationship = async function createRacingSessionHasSessionResultRelationship(racingSessionId, sessionResultId) {
    return submitPostRequest("/racing-sessions/" + racingSessionId + "/has-session-result/" + sessionResultId)
}
