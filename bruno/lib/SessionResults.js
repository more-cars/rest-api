const {submitPostRequest, submitGetRequest} = require("./request")
const {ensureValidRacingSessionExists} = require("./RacingSessions")
const {ensureValidLapTimeExists} = require("./LapTimes")
const {ensureValidImageExists} = require("./Images")

async function ensureValidSessionResultExists() {
    if (!bru.getEnvVar('validSessionResultId')) {
        const nodeList = await getAllSessionResults()
        if (nodeList.length > 0) {
            bru.setEnvVar("validSessionResultId", nodeList[0].data.id)
        } else {
            const newNode = await createSessionResult()
            bru.setEnvVar("validSessionResultId", newNode.data.id)
        } //
    }
}

exports.ensureValidSessionResultExists = ensureValidSessionResultExists

async function createSessionResult() {
    return submitPostRequest("/session-results", {
        position: 1,
        driver_name: 'Lewis Hamilton',
    })
}

exports.createSessionResult = createSessionResult

async function getAllSessionResults() {
    return submitGetRequest("/session-results")
}

exports.getAllSessionResults = getAllSessionResults

async function ensureSessionResultBelongsToRacingSessionRelationshipExists() {
    await ensureValidSessionResultExists()
    await ensureValidRacingSessionExists()
    await createSessionResultBelongsToRacingSessionRelationship(bru.getEnvVar('validSessionResultId'), bru.getEnvVar('validRacingSessionId'))
}

exports.ensureSessionResultBelongsToRacingSessionRelationshipExists = ensureSessionResultBelongsToRacingSessionRelationshipExists

async function createSessionResultBelongsToRacingSessionRelationship(sessionResultId, racingSessionId) {
    return submitPostRequest("/session-results/" + sessionResultId + "/belongs-to-racing-session/" + racingSessionId)
}

exports.createSessionResultBelongsToRacingSessionRelationship = createSessionResultBelongsToRacingSessionRelationship

async function ensureSessionResultHasLapTimeRelationshipExists() {
    await ensureValidSessionResultExists()
    await ensureValidLapTimeExists()
    await createSessionResultHasLapTimeRelationship(bru.getEnvVar('validSessionResultId'), bru.getEnvVar('validLapTimeId'))
}

exports.ensureSessionResultHasLapTimeRelationshipExists = ensureSessionResultHasLapTimeRelationshipExists

async function createSessionResultHasLapTimeRelationship(sessionResultId, lapTimeId) {
    return submitPostRequest("/session-results/" + sessionResultId + "/has-lap-time/" + lapTimeId)
}

exports.createSessionResultHasLapTimeRelationship = createSessionResultHasLapTimeRelationship

async function ensureSessionResultHasImageRelationshipExists() {
    await ensureValidSessionResultExists()
    await ensureValidImageExists()
    await createSessionResultHasImageRelationship(bru.getEnvVar('validSessionResultId'), bru.getEnvVar('validImageId'))
}

exports.ensureSessionResultHasImageRelationshipExists = ensureSessionResultHasImageRelationshipExists

async function createSessionResultHasImageRelationship(sessionResultId, imageId) {
    return submitPostRequest("/session-results/" + sessionResultId + "/has-image/" + imageId)
}

exports.createSessionResultHasImageRelationship = createSessionResultHasImageRelationship

async function ensureSessionResultHasPrimeImageRelationshipExists() {
    await ensureValidSessionResultExists()
    await ensureValidImageExists()
    await createSessionResultHasPrimeImageRelationship(bru.getEnvVar('validSessionResultId'), bru.getEnvVar('validImageId'))
}

exports.ensureSessionResultHasPrimeImageRelationshipExists = ensureSessionResultHasPrimeImageRelationshipExists

async function createSessionResultHasPrimeImageRelationship(sessionResultId, imageId) {
    return submitPostRequest("/session-results/" + sessionResultId + "/has-prime-image/" + imageId)
}

exports.createSessionResultHasPrimeImageRelationship = createSessionResultHasPrimeImageRelationship
