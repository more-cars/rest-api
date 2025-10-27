const axios = require("axios")

async function ensureValidRacingSessionExists() {
    if (!bru.getEnvVar('validRacingSessionId')) {
        const newNode = await createRacingSession()
        bru.setEnvVar("validRacingSessionId", newNode.data.id)
    }
}

exports.ensureValidRacingSessionExists = ensureValidRacingSessionExists

async function createRacingSession() {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/racing-sessions", {
        name: 'Grand Prix',
    })

    return response.data
}

exports.createRacingSession = createRacingSession
