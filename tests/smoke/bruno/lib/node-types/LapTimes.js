const {post} = require("../apiRequest.js")

exports.createBelongsToSessionResultRelationship = async function () {
    await post("/lap-times/" + bru.getEnvVar('validLapTimeId') + "/belongs-to-session-result/" + bru.getEnvVar('validSessionResultId'))
}

exports.createAchievedWithCarModelVariantRelationship = async function () {
    await post("/lap-times/" + bru.getEnvVar('validLapTimeId') + "/achieved-with-car-model-variant/" + bru.getEnvVar('validCarModelVariantId'))
}

exports.createAchievedOnTrackLayoutRelationship = async function () {
    await post("/lap-times/" + bru.getEnvVar('validLapTimeId') + "/achieved-on-track-layout/" + bru.getEnvVar('validTrackLayoutId'))
}

exports.createHasImageRelationship = async function () {
    await post("/lap-times/" + bru.getEnvVar('validLapTimeId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/lap-times/" + bru.getEnvVar('validLapTimeId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/lap-times", {
        time: 'Dummy Lap Time',
        driver_name: 'Dummy Lap Time',
    })
    const lapTime = response.data
    bru.setEnvVar('valid' + prefix + 'LapTimeId', lapTime.id)

    return lapTime
}
