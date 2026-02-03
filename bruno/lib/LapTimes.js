const {submitPostRequest, submitGetRequest} = require("./request")

exports.ensureValidLapTimeExists = async function () {
    if (!bru.getEnvVar('validLapTimeId')) {
        const nodeList = await this.getAllLapTimes()
        if (nodeList.length > 0) {
            bru.setEnvVar("validLapTimeId", nodeList[0].data.id)
        } else {
            const newNode = await this.createLapTime()
            bru.setEnvVar("validLapTimeId", newNode.data.id)
        } //
    }
}

exports.createLapTime = async function () {
    return submitPostRequest("/lap-times", {
        time: 'PT1M33.294S',
        driver_name: 'Klaus Ludwig',
    })
}

exports.getAllLapTimes = async function () {
    return submitGetRequest("/lap-times")
}

exports.ensureLapTimeBelongsToSessionResultRelationshipExists = async function (lapTimeId, sessionResultId) {
    return submitPostRequest("/lap-times/" + lapTimeId + "/belongs-to-session-result/" + sessionResultId)
}

exports.ensureLapTimeAchievedOnTrackLayoutRelationshipExists = async function (lapTimeId, trackLayoutId) {
    return submitPostRequest("/lap-times/" + lapTimeId + "/achieved-on-track-layout/" + trackLayoutId)
}

exports.ensureLapTimeHasImageRelationshipExists = async function (lapTimeId, imageId) {
    return submitPostRequest("/lap-times/" + lapTimeId + "/has-image/" + imageId)
}

exports.ensureLapTimeHasPrimeImageRelationshipExists = async function (lapTimeId, imageId) {
    return submitPostRequest("/lap-times/" + lapTimeId + "/has-prime-image/" + imageId)
}

exports.ensureLapTimeAchievedWithCarModelVariantRelationshipExists = async function (lapTimeId, carModelVariantId) {
    return submitPostRequest("/lap-times/" + lapTimeId + "/achieved-with-car-model-variant/" + carModelVariantId)
}
