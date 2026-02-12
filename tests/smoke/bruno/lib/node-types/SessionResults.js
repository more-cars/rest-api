const {post} = require("../apiRequest.js")

exports.createBelongsToRacingSessionRelationship = async function () {
    await post("/session-results/" + bru.getEnvVar('validSessionResultId') + "/belongs-to-racing-session/" + bru.getEnvVar('validRacingSessionId'))
}

exports.createAchievedWithCarModelVariantRelationship = async function () {
    await post("/session-results/" + bru.getEnvVar('validSessionResultId') + "/achieved-with-car-model-variant/" + bru.getEnvVar('validCarModelVariantId'))
}

exports.createHasLapTimeRelationship = async function () {
    await post("/session-results/" + bru.getEnvVar('validSessionResultId') + "/has-lap-time/" + bru.getEnvVar('validLapTimeId'))
}

exports.createHasImageRelationship = async function () {
    await post("/session-results/" + bru.getEnvVar('validSessionResultId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/session-results/" + bru.getEnvVar('validSessionResultId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/session-results", {
        position: 1,
        driver_name: 'Dummy Session Result',
    })
    const sessionResult = response.data
    bru.setEnvVar('valid' + prefix + 'SessionResultId', sessionResult.id)

    return sessionResult
}
