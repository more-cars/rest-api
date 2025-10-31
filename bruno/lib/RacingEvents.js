const {submitPostRequest, submitGetRequest} = require("./request")
const {ensureValidRacingSeriesExists} = require("./RacingSeries")
const {ensureValidRaceTrackExists} = require("./RaceTracks")
const {ensureValidTrackLayoutExists} = require("./TrackLayouts")
const {ensureValidImageExists} = require("./Images")
const {ensureValidRacingSessionExists} = require("./RacingSessions")

exports.ensureValidRacingEventExists = async function ensureValidRacingEventExists() {
    if (!bru.getEnvVar('validRacingEventId')) {
        const nodeList = await this.getAllRacingEvents()
        if (nodeList.length > 0) {
            bru.setEnvVar("validRacingEventId", nodeList[0].data.id)
        } else {
            const newNode = await this.createRacingEvent()
            bru.setEnvVar("validRacingEventId", newNode.data.id)
        } //
    }
}

exports.ensureValidSecondRacingEventExists = async function ensureValidSecondRacingEventExists() {
    const nodeList = await this.getAllRacingEvents()
    if (nodeList.length > 1) {
        bru.setEnvVar("validSecongRacingEventId", nodeList[nodeList.length - 1].data.id)
    } else {
        const newNode = await this.createRacingEvent()
        bru.setEnvVar("validSecondRacingEventId", newNode.data.id)
    }
}

exports.createRacingEvent = async function createRacingEvent() {
    return submitPostRequest("/racing-events", {
        name: 'GP Monaco 2025',
    })
}

exports.getAllRacingEvents = async function getAllRacingEvents() {
    return submitGetRequest("/racing-events")
}

exports.ensureRacingEventBelongsToRacingSeriesRelationshipExists = async function ensureRacingEventBelongsToRacingSeriesRelationshipExists() {
    await this.ensureValidRacingEventExists()
    await ensureValidRacingSeriesExists()
    await this.createRacingEventBelongsToRacingSeriesRelationship(bru.getEnvVar('validRacingEventId'), bru.getEnvVar('validRacingSeriesId'))
}

exports.createRacingEventBelongsToRacingSeriesRelationship = async function createRacingEventBelongsToRacingSeriesRelationship(racingEventId, racingSeriesId) {
    return submitPostRequest("/racing-events/" + racingEventId + "/belongs-to-racing-series/" + racingSeriesId)
}

exports.ensureRacingEventIsFollowedByEventRelationshipExists = async function ensureRacingEventIsFollowedByEventRelationshipExists() {
    await this.ensureValidRacingEventExists()
    await this.ensureValidSecondRacingEventExists()
    await this.createRacingEventIsFollowedByEventRelationship(bru.getEnvVar('validRacingEventId'), bru.getEnvVar('validSecondRacingEventId'))
}

exports.createRacingEventIsFollowedByEventRelationship = async function createRacingEventIsFollowedByEventRelationship(racingEventId, partnerId) {
    return submitPostRequest("/racing-events/" + racingEventId + "/is-followed-by-event/" + partnerId)
}

exports.ensureRacingEventFollowsEventRelationshipExists = async function ensureRacingEventFollowsEventRelationshipExists() {
    await this.ensureValidRacingEventExists()
    await this.ensureValidSecondRacingEventExists()
    await this.createRacingEventFollowsEventRelationship(bru.getEnvVar('validRacingEventId'), bru.getEnvVar('validSecondRacingEventId'))
}

exports.createRacingEventFollowsEventRelationship = async function createRacingEventFollowsEventRelationship(racingEventId, partnerId) {
    return submitPostRequest("/racing-events/" + racingEventId + "/follows-event/" + partnerId)
}

exports.ensureRacingEventTookPlaceAtRaceTrackRelationshipExists = async function ensureRacingEventTookPlaceAtRaceTrackRelationshipExists() {
    await this.ensureValidRacingEventExists()
    await ensureValidRaceTrackExists()
    await this.createRacingEventTookPlaceAtRaceTrackRelationship(bru.getEnvVar('validRacingEventId'), bru.getEnvVar('validRaceTrackId'))
}

exports.createRacingEventTookPlaceAtRaceTrackRelationship = async function createRacingEventTookPlaceAtRaceTrackRelationship(racingEventId, raceTrackId) {
    return submitPostRequest("/racing-events/" + racingEventId + "/took-place-at-race-track/" + raceTrackId)
}

exports.ensureRacingEventUsedTheTrackLayoutRelationshipExists = async function ensureRacingEventUsedTheTrackLayoutRelationshipExists() {
    await this.ensureValidRacingEventExists()
    await ensureValidTrackLayoutExists()
    await this.createRacingEventUsedTheTrackLayoutRelationship(bru.getEnvVar('validRacingEventId'), bru.getEnvVar('validTrackLayoutId'))
}

exports.createRacingEventUsedTheTrackLayoutRelationship = async function createRacingEventUsedTheTrackLayoutRelationship(racingEventId, trackLayoutId) {
    return submitPostRequest("/racing-events/" + racingEventId + "/used-the-track-layout/" + trackLayoutId)
}

exports.ensureRacingEventHasRacingSessionRelationshipExists = async function ensureRacingEventHasRacingSessionRelationshipExists() {
    await this.ensureValidRacingEventExists()
    await ensureValidRacingSessionExists()
    await this.createRacingEventHasRacingSessionRelationship(bru.getEnvVar('validRacingEventId'), bru.getEnvVar('validRacingSessionId'))
}

exports.createRacingEventHasRacingSessionRelationship = async function createRacingEventHasRacingSessionRelationship(racingEventId, racingSessionId) {
    return submitPostRequest("/racing-events/" + racingEventId + "/has-racing-session/" + racingSessionId)
}

exports.ensureRacingEventHasImageRelationshipExists = async function ensureRacingEventHasImageRelationshipExists() {
    await this.ensureValidRacingEventExists()
    await ensureValidImageExists()
    await this.createRacingEventHasImageRelationship(bru.getEnvVar('validRacingEventId'), bru.getEnvVar('validImageId'))
}

exports.createRacingEventHasImageRelationship = async function createRacingEventHasImageRelationship(racingEventId, imageId) {
    return submitPostRequest("/racing-events/" + racingEventId + "/has-image/" + imageId)
}

exports.ensureRacingEventHasPrimeImageRelationshipExists = async function ensureRacingEventHasPrimeImageRelationshipExists() {
    await this.ensureValidRacingEventExists()
    await ensureValidImageExists()
    await this.createRacingEventHasPrimeImageRelationship(bru.getEnvVar('validRacingEventId'), bru.getEnvVar('validImageId'))
}

exports.createRacingEventHasPrimeImageRelationship = async function createRacingEventHasPrimeImageRelationship(racingEventId, imageId) {
    return submitPostRequest("/racing-events/" + racingEventId + "/has-prime-image/" + imageId)
}
