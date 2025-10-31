const {submitPostRequest, submitGetRequest} = require("./request")
const {ensureValidCarModelExists} = require("./CarModels")
const {ensureValidSessionResultExists} = require("./SessionResults")
const {ensureValidLapTimeExists} = require("./LapTimes")
const {ensureValidImageExists} = require("./Images")

exports.ensureValidCarModelVariantExists = async function () {
    if (!bru.getEnvVar('validCarModelVariantId')) {
        const nodeList = await this.getAllCarModelVariants()
        if (nodeList.length > 0) {
            bru.setEnvVar("validCarModelVariantId", nodeList[0].data.id)
        } else {
            const newNode = await this.createCarModelVariant()
            bru.setEnvVar("validCarModelVariantId", newNode.data.id)
        } //
    }
}

exports.createCarModelVariant = async function () {
    return submitPostRequest("/car-model-variants", {
        name: 'BMW M3',
    })
}

exports.getAllCarModelVariants = async function () {
    return submitGetRequest("/car-model-variants")
}

exports.ensureCarModelVariantIsVariantOfRelationshipExists = async function () {
    await this.ensureValidCarModelVariantExists()
    await ensureValidCarModelExists()
    await this.createCarModelVariantIsVariantOfRelationship(bru.getEnvVar('validCarModelVariantId'), bru.getEnvVar('validCarModelId'))
}

exports.createCarModelVariantIsVariantOfRelationship = async function (carModelVariantId, carModelId) {
    return submitPostRequest("/car-model-variants/" + carModelVariantId + "/is-variant-of/" + carModelId)
}

exports.ensureCarModelVariantAchievedSessionResultRelationshipExists = async function () {
    await this.ensureValidCarModelVariantExists()
    await ensureValidSessionResultExists()
    await this.createCarModelVariantAchievedSessionResultRelationship(bru.getEnvVar('validCarModelVariantId'), bru.getEnvVar('validSessionResultId'))
}

exports.createCarModelVariantAchievedSessionResultRelationship = async function (carModelVariantId, sessionResultId) {
    return submitPostRequest("/car-model-variants/" + carModelVariantId + "/achieved-session-result/" + sessionResultId)
}

exports.ensureCarModelVariantAchievedLapTimeRelationshipExists = async function () {
    await this.ensureValidCarModelVariantExists()
    await ensureValidLapTimeExists()
    await this.createCarModelVariantAchievedLapTimeRelationship(bru.getEnvVar('validCarModelVariantId'), bru.getEnvVar('validLapTimeId'))
}

exports.createCarModelVariantAchievedLapTimeRelationship = async function (carModelVariantId, lapTimeId) {
    return submitPostRequest("/car-model-variants/" + carModelVariantId + "/achieved-lap-time/" + lapTimeId)
}

exports.ensureCarModelVariantHasImageRelationshipExists = async function () {
    await this.ensureValidCarModelVariantExists()
    await ensureValidImageExists()
    await this.createCarModelVariantHasImageRelationship(bru.getEnvVar('validCarModelVariantId'), bru.getEnvVar('validImageId'))
}

exports.createCarModelVariantHasImageRelationship = async function (carModelVariantId, imageId) {
    return submitPostRequest("/car-model-variants/" + carModelVariantId + "/has-image/" + imageId)
}

exports.ensureCarModelVariantHasPrimeImageRelationshipExists = async function () {
    await this.ensureValidCarModelVariantExists()
    await ensureValidImageExists()
    await this.createCarModelVariantHasPrimeImageRelationship(bru.getEnvVar('validCarModelVariantId'), bru.getEnvVar('validImageId'))
}

exports.createCarModelVariantHasPrimeImageRelationship = async function (carModelVariantId, imageId) {
    return submitPostRequest("/car-model-variants/" + carModelVariantId + "/has-prime-image/" + imageId)
}
