const axios = require("axios")
const {ensureValidRacingSeriesExists} = require("./RacingSeries")

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

async function ensureValidSecondRacingEventExists() {
    const nodeList = await getAllRacingEvents()
    if (nodeList.length > 1) {
        bru.setEnvVar("validSecongRacingEventId", nodeList[nodeList.length - 1].data.id)
    } else {
        const newNode = await createRacingEvent()
        bru.setEnvVar("validSecondRacingEventId", newNode.data.id)
    }
}

exports.ensureValidSecondRacingEventExists = ensureValidSecondRacingEventExists

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

async function ensureRacingEventBelongsToRacingSeriesRelationshipExists() {
    await ensureValidRacingEventExists()
    await ensureValidRacingSeriesExists()
    await createRacingEventBelongsToRacingSeriesRelationship(bru.getEnvVar('validRacingEventId'), bru.getEnvVar('validRacingSeriesId'))
}

exports.ensureRacingEventBelongsToRacingSeriesRelationshipExists = ensureRacingEventBelongsToRacingSeriesRelationshipExists

async function createRacingEventBelongsToRacingSeriesRelationship(racingEventId, racingSeriesId) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/racing-events/" + racingEventId + "/belongs-to-racing-series/" + racingSeriesId, null, {
        validateStatus: function (status) {
            return status < 400
        }
    })

    return response.data
}

exports.createRacingEventBelongsToRacingSeriesRelationship = createRacingEventBelongsToRacingSeriesRelationship

async function ensureRacingEventIsFollowedByEventRelationshipExists() {
    await ensureValidRacingEventExists()
    await ensureValidSecondRacingEventExists()
    await createRacingEventIsFollowedByEventRelationship(bru.getEnvVar('validRacingEventId'), bru.getEnvVar('validSecondRacingEventId'))
}

exports.ensureRacingEventIsFollowedByEventRelationshipExists = ensureRacingEventIsFollowedByEventRelationshipExists

async function createRacingEventIsFollowedByEventRelationship(racingEventId, partnerId) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/racing-events/" + racingEventId + "/is-followed-by-event/" + partnerId, null, {
        validateStatus: function (status) {
            return status < 400
        }
    })

    return response.data
}

exports.createRacingEventIsFollowedByEventRelationship = createRacingEventIsFollowedByEventRelationship
