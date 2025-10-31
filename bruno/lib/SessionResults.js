const {submitPostRequest, submitGetRequest} = require("./request")
const {ensureValidRacingSessionExists} = require("./RacingSessions")
const {ensureValidLapTimeExists} = require("./LapTimes")
const {ensureValidImageExists} = require("./Images")
const {ensureValidCarModelVariantExists} = require("./CarModelVariants")

exports.ensureValidSessionResultExists = async function ensureValidSessionResultExists() {
    if (!bru.getEnvVar('validSessionResultId')) {
        const nodeList = await this.getAllSessionResults()
        if (nodeList.length > 0) {
            bru.setEnvVar("validSessionResultId", nodeList[0].data.id)
        } else {
            const newNode = await this.createSessionResult()
            bru.setEnvVar("validSessionResultId", newNode.data.id)
        } //
    }
}

exports.createSessionResult = async function createSessionResult() {
    return submitPostRequest("/session-results", {
        position: 1,
        driver_name: 'Lewis Hamilton',
    })
}

exports.getAllSessionResults = async function getAllSessionResults() {
    return submitGetRequest("/session-results")
}

exports.ensureSessionResultBelongsToRacingSessionRelationshipExists = async function ensureSessionResultBelongsToRacingSessionRelationshipExists() {
    await this.ensureValidSessionResultExists()
    await ensureValidRacingSessionExists()
    await this.createSessionResultBelongsToRacingSessionRelationship(bru.getEnvVar('validSessionResultId'), bru.getEnvVar('validRacingSessionId'))
}

exports.createSessionResultBelongsToRacingSessionRelationship = async function createSessionResultBelongsToRacingSessionRelationship(sessionResultId, racingSessionId) {
    return submitPostRequest("/session-results/" + sessionResultId + "/belongs-to-racing-session/" + racingSessionId)
}

exports.ensureSessionResultHasLapTimeRelationshipExists = async function ensureSessionResultHasLapTimeRelationshipExists() {
    await this.ensureValidSessionResultExists()
    await ensureValidLapTimeExists()
    await this.createSessionResultHasLapTimeRelationship(bru.getEnvVar('validSessionResultId'), bru.getEnvVar('validLapTimeId'))
}

exports.createSessionResultHasLapTimeRelationship = async function createSessionResultHasLapTimeRelationship(sessionResultId, lapTimeId) {
    return submitPostRequest("/session-results/" + sessionResultId + "/has-lap-time/" + lapTimeId)
}

exports.ensureSessionResultHasImageRelationshipExists = async function ensureSessionResultHasImageRelationshipExists() {
    await this.ensureValidSessionResultExists()
    await ensureValidImageExists()
    await this.createSessionResultHasImageRelationship(bru.getEnvVar('validSessionResultId'), bru.getEnvVar('validImageId'))
}

exports.createSessionResultHasImageRelationship = async function createSessionResultHasImageRelationship(sessionResultId, imageId) {
    return submitPostRequest("/session-results/" + sessionResultId + "/has-image/" + imageId)
}

exports.ensureSessionResultHasPrimeImageRelationshipExists = async function ensureSessionResultHasPrimeImageRelationshipExists() {
    await this.ensureValidSessionResultExists()
    await ensureValidImageExists()
    await this.createSessionResultHasPrimeImageRelationship(bru.getEnvVar('validSessionResultId'), bru.getEnvVar('validImageId'))
}

exports.createSessionResultHasPrimeImageRelationship = async function createSessionResultHasPrimeImageRelationship(sessionResultId, imageId) {
    return submitPostRequest("/session-results/" + sessionResultId + "/has-prime-image/" + imageId)
}

exports.ensureSessionResultAchievedWithCarModelVariantRelationshipExists = async function ensureSessionResultAchievedWithCarModelVariantRelationshipExists() {
    await this.ensureValidSessionResultExists()
    await ensureValidCarModelVariantExists()
    await this.createSessionResultAchievedWithCarModelVariantRelationship(bru.getEnvVar('validSessionResultId'), bru.getEnvVar('validCarModelVariantId'))
}

exports.createSessionResultAchievedWithCarModelVariantRelationship = async function createSessionResultAchievedWithCarModelVariantRelationship(sessionResultId, carModelVariantId) {
    return submitPostRequest("/session-results/" + sessionResultId + "/achieved-with-car-model-variant/" + carModelVariantId)
}
