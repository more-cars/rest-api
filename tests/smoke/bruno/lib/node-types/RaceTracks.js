const {post} = require("../apiRequest.js")

exports.create = async function (prefix = '') {
    const response = await post("/race-tracks", {
        name: 'Dummy Race Track',
    })
    const raceTrack = response.data
    bru.setEnvVar('valid' + prefix + 'RaceTrackId', raceTrack.id)

    return raceTrack
}

exports.createBelongsToCompanyRelationship = async function () {
    await post("/race-tracks/" + bru.getEnvVar('validRaceTrackId') + "/has-layout/" + bru.getEnvVar('validTrackLayoutId'))
}

exports.createHasCarModelRelationship = async function () {
    await post("/race-tracks/" + bru.getEnvVar('validRaceTrackId') + "/hosted-racing-event/" + bru.getEnvVar('validRacingEventId'))
}

exports.createHasImageRelationship = async function () {
    await post("/race-tracks/" + bru.getEnvVar('validRaceTrackId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/race-tracks/" + bru.getEnvVar('validRaceTrackId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}
