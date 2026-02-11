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

exports.createHasImageRelationship = async function () {
    await post("/track-layouts/" + bru.getEnvVar('validTrackLayoutId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/track-layouts/" + bru.getEnvVar('validTrackLayoutId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/track-layouts", {
        name: 'Dummy Track Layout',
    })
    const trackLayout = response.data
    bru.setEnvVar('valid' + prefix + 'TrackLayoutId', trackLayout.id)

    return trackLayout
}
