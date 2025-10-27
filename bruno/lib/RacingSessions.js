const {submitPostRequest, submitGetRequest} = require("./request")
const {ensureValidRacingEventExists} = require("./RacingEvents")

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
