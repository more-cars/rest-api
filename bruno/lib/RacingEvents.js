const axios = require("axios")

async function ensureValidRacingEventExists() {
    if (!bru.getEnvVar('validRacingEventId')) {
        const newNode = await createRacingEvent()
        bru.setEnvVar("validRacingEventId", newNode.data.id)
    }
}

exports.ensureValidRacingEventExists = ensureValidRacingEventExists

async function createRacingEvent() {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/racing-events", {
        name: 'GP Monaco 2025',
    })

    return response.data
}

exports.createRacingEvent = createRacingEvent
