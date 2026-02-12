const {post} = require("../apiRequest")

exports.createBelongsToRacingSeriesRelationship = async function () {
    await post("/racing-events/" + bru.getEnvVar('validRacingEventId') + "/belongs-to-racing-series/" + bru.getEnvVar('validRacingSeriesId'))
}

exports.createFollowsEventRelationship = async function () {
    await post("/racing-events/" + bru.getEnvVar('validRacingEventId') + "/follows-event/" + bru.getEnvVar('validSecondRacingEventId'))
}

exports.createIsFollowedByEventRelationship = async function () {
    await post("/racing-events/" + bru.getEnvVar('validRacingEventId') + "/is-followed-by-event/" + bru.getEnvVar('validSecondRacingEventId'))
}

exports.createHasRacingSessionRelationship = async function () {
    await post("/racing-events/" + bru.getEnvVar('validRacingEventId') + "/has-racing-session/" + bru.getEnvVar('validRacingSessionId'))
}

exports.createTookPlaceAtRaceTrackRelationship = async function () {
    await post("/racing-events/" + bru.getEnvVar('validRacingEventId') + "/took-place-at-race-track/" + bru.getEnvVar('validRaceTrackId'))
}

exports.createUsedTheTrackLayoutRelationship = async function () {
    await post("/racing-events/" + bru.getEnvVar('validRacingEventId') + "/used-the-track-layout/" + bru.getEnvVar('validTrackLayoutId'))
}

exports.createHasImageRelationship = async function () {
    await post("/racing-events/" + bru.getEnvVar('validRacingEventId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/racing-events/" + bru.getEnvVar('validRacingEventId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/racing-events", {
        name: 'Dummy Racing Event',
    })
    const racingEvent = response.data
    bru.setEnvVar('valid' + prefix + 'RacingEventId', racingEvent.id)

    return racingEvent
}
