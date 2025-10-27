const axios = require("axios")
const {ensureValidRacingSeriesExists} = require("./RacingSeries")
const {ensureValidRaceTrackExists} = require("./RaceTracks")
const {ensureValidTrackLayoutExists} = require("./TrackLayouts")
const {ensureValidImageExists} = require("./Images")
const {ensureValidRacingSessionExists} = require("./RacingSessions")

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

async function ensureRacingEventFollowsEventRelationshipExists() {
    await ensureValidRacingEventExists()
    await ensureValidSecondRacingEventExists()
    await createRacingEventFollowsEventRelationship(bru.getEnvVar('validRacingEventId'), bru.getEnvVar('validSecondRacingEventId'))
}

exports.ensureRacingEventFollowsEventRelationshipExists = ensureRacingEventFollowsEventRelationshipExists

async function createRacingEventFollowsEventRelationship(racingEventId, partnerId) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/racing-events/" + racingEventId + "/follows-event/" + partnerId, null, {
        validateStatus: function (status) {
            return status < 400
        }
    })

    return response.data
}

exports.createRacingEventFollowsEventRelationship = createRacingEventFollowsEventRelationship

async function ensureRacingEventTookPlaceAtRaceTrackRelationshipExists() {
    await ensureValidRacingEventExists()
    await ensureValidRaceTrackExists()
    await createRacingEventTookPlaceAtRaceTrackRelationship(bru.getEnvVar('validRacingEventId'), bru.getEnvVar('validRaceTrackId'))
}

exports.ensureRacingEventTookPlaceAtRaceTrackRelationshipExists = ensureRacingEventTookPlaceAtRaceTrackRelationshipExists

async function createRacingEventTookPlaceAtRaceTrackRelationship(racingEventId, raceTrackId) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/racing-events/" + racingEventId + "/took-place-at-race-track/" + raceTrackId, null, {
        validateStatus: function (status) {
            return status < 400
        }
    })

    return response.data
}

exports.createRacingEventTookPlaceAtRaceTrackRelationship = createRacingEventTookPlaceAtRaceTrackRelationship

async function ensureRacingEventUsedTheTrackLayoutRelationshipExists() {
    await ensureValidRacingEventExists()
    await ensureValidTrackLayoutExists()
    await createRacingEventUsedTheTrackLayoutRelationship(bru.getEnvVar('validRacingEventId'), bru.getEnvVar('validTrackLayoutId'))
}

exports.ensureRacingEventUsedTheTrackLayoutRelationshipExists = ensureRacingEventUsedTheTrackLayoutRelationshipExists

async function createRacingEventUsedTheTrackLayoutRelationship(racingEventId, trackLayoutId) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/racing-events/" + racingEventId + "/used-the-track-layout/" + trackLayoutId, null, {
        validateStatus: function (status) {
            return status < 400
        }
    })

    return response.data
}

exports.createRacingEventUsedTheTrackLayoutRelationship = createRacingEventUsedTheTrackLayoutRelationship

async function ensureRacingEventHasRacingSessionRelationshipExists() {
    await ensureValidRacingEventExists()
    await ensureValidRacingSessionExists()
    await createRacingEventHasRacingSessionRelationship(bru.getEnvVar('validRacingEventId'), bru.getEnvVar('validRacingSessionId'))
}

exports.ensureRacingEventHasRacingSessionRelationshipExists = ensureRacingEventHasRacingSessionRelationshipExists

async function createRacingEventHasRacingSessionRelationship(racingEventId, racingSessionId) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/racing-events/" + racingEventId + "/has-racing-session/" + racingSessionId, null, {
        validateStatus: function (status) {
            return status < 400
        }
    })

    return response.data
}

exports.createRacingEventHasRacingSessionRelationship = createRacingEventHasRacingSessionRelationship

async function ensureRacingEventHasImageRelationshipExists() {
    await ensureValidRacingEventExists()
    await ensureValidImageExists()
    await createRacingEventHasImageRelationship(bru.getEnvVar('validRacingEventId'), bru.getEnvVar('validImageId'))
}

exports.ensureRacingEventHasImageRelationshipExists = ensureRacingEventHasImageRelationshipExists

async function createRacingEventHasImageRelationship(racingEventId, imageId) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/racing-events/" + racingEventId + "/has-image/" + imageId, null, {
        validateStatus: function (status) {
            return status < 400
        }
    })

    return response.data
}

exports.createRacingEventHasImageRelationship = createRacingEventHasImageRelationship

async function ensureRacingEventHasPrimeImageRelationshipExists() {
    await ensureValidRacingEventExists()
    await ensureValidImageExists()
    await createRacingEventHasPrimeImageRelationship(bru.getEnvVar('validRacingEventId'), bru.getEnvVar('validImageId'))
}

exports.ensureRacingEventHasPrimeImageRelationshipExists = ensureRacingEventHasPrimeImageRelationshipExists

async function createRacingEventHasPrimeImageRelationship(racingEventId, imageId) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/racing-events/" + racingEventId + "/has-prime-image/" + imageId, null, {
        validateStatus: function (status) {
            return status < 400
        }
    })

    return response.data
}

exports.createRacingEventHasPrimeImageRelationship = createRacingEventHasPrimeImageRelationship
