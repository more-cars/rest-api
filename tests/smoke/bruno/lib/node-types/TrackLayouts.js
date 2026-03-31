const {post} = require("../apiRequest.js")

exports.createBelongsToRaceTrackRelationship = async function () {
    await post("/track-layouts/" + bru.getEnvVar('validTrackLayoutId') + "/belongs-to-race-track/" + bru.getEnvVar('validRaceTrackId'))
}

exports.createWasUsedByRacingEventRelationship = async function () {
    await post("/track-layouts/" + bru.getEnvVar('validTrackLayoutId') + "/was-used-by-racing-event/" + bru.getEnvVar('validRacingEventId'))
}

exports.createHasLapTimeRelationship = async function () {
    await post("/track-layouts/" + bru.getEnvVar('validTrackLayoutId') + "/has-lap-time/" + bru.getEnvVar('validLapTimeId'))
}

exports.createIsFeaturedInRacingGameRelationship = async function () {
    await post("/track-layouts/" + bru.getEnvVar('validTrackLayoutId') + "/is-featured-in-racing-game/" + bru.getEnvVar('validRacingGameId'))
}

exports.createHasImageRelationship = async function () {
    await post("/track-layouts/" + bru.getEnvVar('validTrackLayoutId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/track-layouts/" + bru.getEnvVar('validTrackLayoutId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasVideoRelationship = async function () {
    await post("/track-layouts/" + bru.getEnvVar('validTrackLayoutId') + "/has-video/" + bru.getEnvVar('validVideoId'))
}

exports.createHasMainVideoRelationship = async function () {
    await post("/track-layouts/" + bru.getEnvVar('validTrackLayoutId') + "/has-main-video/" + bru.getEnvVar('validVideoId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/track-layouts", {
        name: 'Dummy Track Layout',
    })

    bru.setEnvVar('valid' + prefix + 'TrackLayoutId', response.id)

    return response.attributes
}
