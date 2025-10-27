const axios = require("axios")

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

async function getAllRacingSessions() {
    const response = await axios.get(bru.getEnvVar('baseUrl') + "/racing-sessions")
    return response.data
}

exports.getAllRacingSessions = getAllRacingSessions

exports.ensureValidRacingSessionExists = ensureValidRacingSessionExists

async function createRacingSession() {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/racing-sessions", {
        name: 'Grand Prix',
    })

    return response.data
}

exports.createRacingSession = createRacingSession
