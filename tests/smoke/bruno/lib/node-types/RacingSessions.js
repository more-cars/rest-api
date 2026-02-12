const {post} = require("../apiRequest.js")

exports.createBelongsToRacingEventRelationship = async function () {
    await post("/racing-sessions/" + bru.getEnvVar('validRacingSessionId') + "/belongs-to-racing-event/" + bru.getEnvVar('validRacingEventId'))
}

exports.createHasSessionResultRelationship = async function () {
    await post("/racing-sessions/" + bru.getEnvVar('validRacingSessionId') + "/has-session-result/" + bru.getEnvVar('validSessionResultId'))
}

exports.createHasImageRelationship = async function () {
    await post("/racing-sessions/" + bru.getEnvVar('validRacingSessionId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/racing-sessions/" + bru.getEnvVar('validRacingSessionId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/racing-sessions", {
        name: 'Dummy Racing Session',
    })
    const racingSession = response.data
    bru.setEnvVar('valid' + prefix + 'RacingSessionId', racingSession.id)

    return racingSession
}
