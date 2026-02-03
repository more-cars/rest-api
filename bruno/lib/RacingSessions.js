const {submitPostRequest, submitGetRequest} = require("./request")

exports.ensureValidRacingSessionExists = async function () {
    if (!bru.getEnvVar('validRacingSessionId')) {
        const nodeList = await this.getAllRacingSessions()
        if (nodeList.length > 0) {
            bru.setEnvVar("validRacingSessionId", nodeList[0].data.id)
        } else {
            const newNode = await this.createRacingSession()
            bru.setEnvVar("validRacingSessionId", newNode.data.id)
        } //
    }
}

exports.getAllRacingSessions = async function () {
    return submitGetRequest("/racing-sessions")
}

exports.createRacingSession = async function () {
    return submitPostRequest("/racing-sessions", {
        name: 'Grand Prix',
    })
}

exports.ensureRacingSessionBelongsToRacingEventRelationshipExists = async function (racingSessionId, racingEventId) {
    return submitPostRequest("/racing-sessions/" + racingSessionId + "/belongs-to-racing-event/" + racingEventId)
}

exports.ensureRacingSessionHasImageRelationshipExists = async function (racingSessionId, imageId) {
    return submitPostRequest("/racing-sessions/" + racingSessionId + "/has-image/" + imageId)
}

exports.ensureRacingSessionHasPrimeImageRelationshipExists = async function (racingSessionId, imageId) {
    return submitPostRequest("/racing-sessions/" + racingSessionId + "/has-prime-image/" + imageId)
}

exports.ensureRacingSessionHasSessionResultRelationshipExists = async function (racingSessionId, sessionResultId) {
    return submitPostRequest("/racing-sessions/" + racingSessionId + "/has-session-result/" + sessionResultId)
}
