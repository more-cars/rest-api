const axios = require("axios")
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
    const response = await axios.get(bru.getEnvVar('baseUrl') + "/racing-sessions")
    return response.data
}

exports.getAllRacingSessions = getAllRacingSessions

async function createRacingSession() {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/racing-sessions", {
        name: 'Grand Prix',
    })

    return response.data
}

exports.createRacingSession = createRacingSession

async function ensureRacingSessionBelongsToRacingEventRelationshipExists() {
    await ensureValidRacingSessionExists()
    await ensureValidRacingEventExists()
    await createRacingSessionBelongsToRacingEventRelationship(bru.getEnvVar('validRacingSessionId'), bru.getEnvVar('validRacingEventId'))
}

exports.ensureRacingSessionBelongsToRacingEventRelationshipExists = ensureRacingSessionBelongsToRacingEventRelationshipExists

async function createRacingSessionBelongsToRacingEventRelationship(racingSessionId, racingEventId) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/racing-sessions/" + racingSessionId + "/belongs-to-racing-event/" + racingEventId, null, {
        validateStatus: function (status) {
            return status < 400
        }
    })

    return response.data
}

exports.createRacingSessionBelongsToRacingEventRelationship = createRacingSessionBelongsToRacingEventRelationship
