const {submitPostRequest, submitGetRequest} = require("./request")

exports.ensureValidRacingEventExists = async function () {
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

exports.ensureValidSecondRacingEventExists = async function () {
    const nodeList = await this.getAllRacingEvents()
    if (nodeList.length > 1) {
        bru.setEnvVar("validSecongRacingEventId", nodeList[nodeList.length - 1].data.id)
    } else {
        const newNode = await this.createRacingEvent()
        bru.setEnvVar("validSecondRacingEventId", newNode.data.id)
    }
}

exports.createRacingEvent = async function () {
    return submitPostRequest("/racing-events", {
        name: 'GP Monaco 2025',
    })
}

exports.getAllRacingEvents = async function () {
    return submitGetRequest("/racing-events")
}

exports.ensureRacingEventBelongsToRacingSeriesRelationshipExists = async function (racingEventId, racingSeriesId) {
    return submitPostRequest("/racing-events/" + racingEventId + "/belongs-to-racing-series/" + racingSeriesId)
}

exports.ensureRacingEventIsFollowedByEventRelationshipExists = async function (racingEventId, partnerId) {
    return submitPostRequest("/racing-events/" + racingEventId + "/is-followed-by-event/" + partnerId)
}

exports.ensureRacingEventFollowsEventRelationshipExists = async function (racingEventId, partnerId) {
    return submitPostRequest("/racing-events/" + racingEventId + "/follows-event/" + partnerId)
}

exports.ensureRacingEventTookPlaceAtRaceTrackRelationshipExists = async function (racingEventId, raceTrackId) {
    return submitPostRequest("/racing-events/" + racingEventId + "/took-place-at-race-track/" + raceTrackId)
}

exports.ensureRacingEventUsedTheTrackLayoutRelationshipExists = async function (racingEventId, trackLayoutId) {
    return submitPostRequest("/racing-events/" + racingEventId + "/used-the-track-layout/" + trackLayoutId)
}

exports.ensureRacingEventHasRacingSessionRelationshipExists = async function (racingEventId, racingSessionId) {
    return submitPostRequest("/racing-events/" + racingEventId + "/has-racing-session/" + racingSessionId)
}

exports.ensureRacingEventHasImageRelationshipExists = async function (racingEventId, imageId) {
    return submitPostRequest("/racing-events/" + racingEventId + "/has-image/" + imageId)
}

exports.ensureRacingEventHasPrimeImageRelationshipExists = async function (racingEventId, imageId) {
    return submitPostRequest("/racing-events/" + racingEventId + "/has-prime-image/" + imageId)
}
