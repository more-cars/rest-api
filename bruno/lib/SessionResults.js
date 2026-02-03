const {submitPostRequest, submitGetRequest} = require("./request")

exports.ensureValidSessionResultExists = async function () {
    if (!bru.getEnvVar('validSessionResultId')) {
        const nodeList = await this.getAllSessionResults()
        if (nodeList.length > 0) {
            bru.setEnvVar("validSessionResultId", nodeList[0].data.id)
        } else {
            const newNode = await this.createSessionResult()
            bru.setEnvVar("validSessionResultId", newNode.data.id)
        } //
    }
}

exports.createSessionResult = async function () {
    return submitPostRequest("/session-results", {
        position: 1,
        driver_name: 'Lewis Hamilton',
    })
}

exports.getAllSessionResults = async function () {
    return submitGetRequest("/session-results")
}

exports.ensureSessionResultBelongsToRacingSessionRelationshipExists = async function (sessionResultId, racingSessionId) {
    return submitPostRequest("/session-results/" + sessionResultId + "/belongs-to-racing-session/" + racingSessionId)
}

exports.ensureSessionResultHasLapTimeRelationshipExists = async function (sessionResultId, lapTimeId) {
    return submitPostRequest("/session-results/" + sessionResultId + "/has-lap-time/" + lapTimeId)
}

exports.ensureSessionResultHasImageRelationshipExists = async function (sessionResultId, imageId) {
    return submitPostRequest("/session-results/" + sessionResultId + "/has-image/" + imageId)
}

exports.ensureSessionResultHasPrimeImageRelationshipExists = async function (sessionResultId, imageId) {
    return submitPostRequest("/session-results/" + sessionResultId + "/has-prime-image/" + imageId)
}

exports.ensureSessionResultAchievedWithCarModelVariantRelationshipExists = async function (sessionResultId, carModelVariantId) {
    return submitPostRequest("/session-results/" + sessionResultId + "/achieved-with-car-model-variant/" + carModelVariantId)
}
