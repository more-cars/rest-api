const {submitPostRequest, submitGetRequest} = require("./request")
const {ensureValidSessionResultExists} = require("./SessionResults")
const {ensureValidTrackLayoutExists} = require("./TrackLayouts")
const {ensureValidImageExists} = require("./Images")
const {ensureValidCarModelVariantExists} = require("./CarModelVariants")

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

exports.ensureLapTimeBelongsToSessionResultRelationshipExists = async function () {
    await this.ensureValidLapTimeExists()
    await ensureValidSessionResultExists()
    await this.createLapTimeBelongsToSessionResultRelationship(bru.getEnvVar('validLapTimeId'), bru.getEnvVar('validSessionResultId'))
}

exports.createLapTimeBelongsToSessionResultRelationship = async function (lapTimeId, sessionResultId) {
    return submitPostRequest("/lap-times/" + lapTimeId + "/belongs-to-session-result/" + sessionResultId)
}

exports.ensureLapTimeAchievedOnTrackLayoutRelationshipExists = async function () {
    await this.ensureValidLapTimeExists()
    await ensureValidTrackLayoutExists()
    await this.createLapTimeAchievedOnTrackLayoutRelationship(bru.getEnvVar('validLapTimeId'), bru.getEnvVar('validTrackLayoutId'))
}

exports.createLapTimeAchievedOnTrackLayoutRelationship = async function (lapTimeId, trackLayoutId) {
    return submitPostRequest("/lap-times/" + lapTimeId + "/achieved-on-track-layout/" + trackLayoutId)
}

exports.ensureLapTimeHasImageRelationshipExists = async function () {
    await this.ensureValidLapTimeExists()
    await ensureValidImageExists()
    await this.createLapTimeHasImageRelationship(bru.getEnvVar('validLapTimeId'), bru.getEnvVar('validImageId'))
}

exports.createLapTimeHasImageRelationship = async function (lapTimeId, imageId) {
    return submitPostRequest("/lap-times/" + lapTimeId + "/has-image/" + imageId)
}

exports.ensureLapTimeHasPrimeImageRelationshipExists = async function () {
    await this.ensureValidLapTimeExists()
    await ensureValidImageExists()
    await this.createLapTimeHasPrimeImageRelationship(bru.getEnvVar('validLapTimeId'), bru.getEnvVar('validImageId'))
}

exports.createLapTimeHasPrimeImageRelationship = async function (lapTimeId, imageId) {
    return submitPostRequest("/lap-times/" + lapTimeId + "/has-prime-image/" + imageId)
}

exports.ensureLapTimeAchievedWithCarModelVariantRelationshipExists = async function () {
    await this.ensureValidLapTimeExists()
    await ensureValidCarModelVariantExists()
    await this.createLapTimeAchievedWithCarModelVariantRelationship(bru.getEnvVar('validLapTimeId'), bru.getEnvVar('validCarModelVariantId'))
}

exports.createLapTimeAchievedWithCarModelVariantRelationship = async function (lapTimeId, carModelVariantId) {
    return submitPostRequest("/lap-times/" + lapTimeId + "/achieved-with-car-model-variant/" + carModelVariantId)
}
