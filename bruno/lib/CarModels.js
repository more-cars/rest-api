const {submitPostRequest, submitGetRequest} = require("./request")
const {ensureValidBrandExists} = require("./Brands")
const {ensureValidImageExists} = require("./Images")
const {ensureValidCarModelVariantExists} = require("./CarModelVariants")

exports.ensureValidCarModelExists = async function () {
    if (!bru.getEnvVar('validCarModelId')) {
        const nodeList = await this.getAllCarModels()
        if (nodeList.length > 0) {
            bru.setEnvVar("validCarModelId", nodeList[0].data.id)
        } else {
            const newNode = await this.createCarModel()
            bru.setEnvVar("validCarModelId", newNode.data.id)
        }
    }
}

exports.ensureValidSecondCarModelExists = async function () {
    const nodeList = await this.getAllCarModels()
    if (nodeList.length > 1) {
        bru.setEnvVar("validSecondCarModelId", nodeList[nodeList.length - 1].data.id)
    } else {
        const newNode = await this.createCarModel()
        bru.setEnvVar("validSecondCarModelId", newNode.data.id)
    }
}

exports.createCarModel = async function () {
    return submitPostRequest("/car-models", {
        name: 'Dummy'
    })
}

exports.getAllCarModels = async function () {
    return submitGetRequest("/car-models")
}

exports.ensureCarModelBelongsToBrandRelationshipExists = async function () {
    await this.ensureValidCarModelExists()
    await ensureValidBrandExists()
    await this.createCarModelBelongsToBrandRelationship(bru.getEnvVar('validCarModelId'), bru.getEnvVar('validBrandId'))
}

exports.createCarModelBelongsToBrandRelationship = async function (carModelId, brandId) {
    return submitPostRequest("/car-models/" + carModelId + "/belongs-to-brand/" + brandId)
}

exports.ensureCarModelHasSuccessorRelationshipExists = async function () {
    await this.ensureValidCarModelExists()
    await this.ensureValidSecondCarModelExists()
    await this.createCarModelHasSuccessorRelationship(bru.getEnvVar('validCarModelId'), bru.getEnvVar('validSecondCarModelId'))
}

exports.createCarModelHasSuccessorRelationship = async function (carModelId, partnerId) {
    return submitPostRequest("/car-models/" + carModelId + "/has-successor/" + partnerId)
}

exports.ensureCarModelIsSuccessorOfRelationshipExists = async function () {
    await this.ensureValidCarModelExists()
    await this.ensureValidSecondCarModelExists()
    await this.createCarModelIsSuccessorOfRelationship(bru.getEnvVar('validCarModelId'), bru.getEnvVar('validSecondCarModelId'))
}

exports.createCarModelIsSuccessorOfRelationship = async function (carModelId, partnerId) {
    return submitPostRequest("/car-models/" + carModelId + "/is-successor-of/" + partnerId)
}

exports.ensureCarModelHasImageRelationshipExists = async function () {
    await this.ensureValidCarModelExists()
    await ensureValidImageExists()
    await this.createCarModelHasImageRelationship(bru.getEnvVar('validCarModelId'), bru.getEnvVar('validImageId'))
}

exports.createCarModelHasImageRelationship = async function (carModelId, imageId) {
    return submitPostRequest("/car-models/" + carModelId + "/has-image/" + imageId)
}

exports.ensureCarModelHasPrimeImageRelationshipExists = async function () {
    await this.ensureValidCarModelExists()
    await ensureValidImageExists()
    await this.createCarModelHasPrimeImageRelationship(bru.getEnvVar('validCarModelId'), bru.getEnvVar('validImageId'))
}

exports.createCarModelHasPrimeImageRelationship = async function (carModelId, imageId) {
    return submitPostRequest("/car-models/" + carModelId + "/has-prime-image/" + imageId)
}

exports.ensureCarModelHasVariantRelationshipExists = async function () {
    await this.ensureValidCarModelExists()
    await ensureValidCarModelVariantExists()
    await this.createCarModelHasVariantRelationship(bru.getEnvVar('validCarModelId'), bru.getEnvVar('validCarModelVariantId'))
}

exports.createCarModelHasVariantRelationship = async function (carModelId, carModelVariantId) {
    return submitPostRequest("/car-models/" + carModelId + "/has-variant/" + carModelVariantId)
}
