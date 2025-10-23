const axios = require("axios")

async function ensureValidRacingEventExists() {
    if (!bru.getEnvVar('validRacingEventId')) {
        const nodeList = await getAllRacingEvents()
        if (nodeList.length > 0) {
            bru.setEnvVar("validRacingEventId", nodeList[0].data.id)
        } else {
            const newNode = await createRacingEvent()
            bru.setEnvVar("validRacingEventId", newNode.data.id)
        } //
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

async function getAllRacingEvents() {
    const response = await axios.get(bru.getEnvVar('baseUrl') + "/racing-events")
    return response.data
}

exports.getAllRacingEvents = getAllRacingEvents
