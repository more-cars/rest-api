const {submitPostRequest, submitGetRequest} = require("./request")
const {ensureValidRacingSessionExists} = require("./RacingSessions")

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
