const {submitPostRequest, submitGetRequest} = require("./request")
const {ensureValidBrandExists} = require("./Brands")
const {ensureValidImageExists} = require("./Images")
const {ensureValidCarModelVariantExists} = require("./CarModelVariants")

exports.ensureValidCarModelExists = async function ensureValidCarModelExists() {
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

exports.ensureValidSecondCarModelExists = async function ensureValidSecondCarModelExists() {
    const nodeList = await this.getAllCarModels()
    if (nodeList.length > 1) {
        bru.setEnvVar("validSecondCarModelId", nodeList[nodeList.length - 1].data.id)
    } else {
        const newNode = await this.createCarModel()
        bru.setEnvVar("validSecondCarModelId", newNode.data.id)
    }
}

exports.createCarModel = async function createCarModel() {
    return submitPostRequest("/car-models", {
        name: 'Dummy'
    })
}

exports.getAllCarModels = async function getAllCarModels() {
    return submitGetRequest("/car-models")
}

exports.ensureCarModelBelongsToBrandRelationshipExists = async function ensureCarModelBelongsToBrandRelationshipExists() {
    await this.ensureValidCarModelExists()
    await ensureValidBrandExists()
    await this.createCarModelBelongsToBrandRelationship(bru.getEnvVar('validCarModelId'), bru.getEnvVar('validBrandId'))
}

exports.createCarModelBelongsToBrandRelationship = async function createCarModelBelongsToBrandRelationship(carModelId, brandId) {
    return submitPostRequest("/car-models/" + carModelId + "/belongs-to-brand/" + brandId)
}

exports.ensureCarModelHasSuccessorRelationshipExists = async function ensureCarModelHasSuccessorRelationshipExists() {
    await this.ensureValidCarModelExists()
    await this.ensureValidSecondCarModelExists()
    await this.createCarModelHasSuccessorRelationship(bru.getEnvVar('validCarModelId'), bru.getEnvVar('validSecondCarModelId'))
}

exports.createCarModelHasSuccessorRelationship = async function createCarModelHasSuccessorRelationship(carModelId, partnerId) {
    return submitPostRequest("/car-models/" + carModelId + "/has-successor/" + partnerId)
}

exports.ensureCarModelIsSuccessorOfRelationshipExists = async function ensureCarModelIsSuccessorOfRelationshipExists() {
    await this.ensureValidCarModelExists()
    await this.ensureValidSecondCarModelExists()
    await this.createCarModelIsSuccessorOfRelationship(bru.getEnvVar('validCarModelId'), bru.getEnvVar('validSecondCarModelId'))
}

exports.createCarModelIsSuccessorOfRelationship = async function createCarModelIsSuccessorOfRelationship(carModelId, partnerId) {
    return submitPostRequest("/car-models/" + carModelId + "/is-successor-of/" + partnerId)
}

exports.ensureCarModelHasImageRelationshipExists = async function ensureCarModelHasImageRelationshipExists() {
    await this.ensureValidCarModelExists()
    await ensureValidImageExists()
    await this.createCarModelHasImageRelationship(bru.getEnvVar('validCarModelId'), bru.getEnvVar('validImageId'))
}

exports.createCarModelHasImageRelationship = async function createCarModelHasImageRelationship(carModelId, imageId) {
    return submitPostRequest("/car-models/" + carModelId + "/has-image/" + imageId)
}

exports.ensureCarModelHasPrimeImageRelationshipExists = async function ensureCarModelHasPrimeImageRelationshipExists() {
    await this.ensureValidCarModelExists()
    await ensureValidImageExists()
    await this.createCarModelHasPrimeImageRelationship(bru.getEnvVar('validCarModelId'), bru.getEnvVar('validImageId'))
}

exports.createCarModelHasPrimeImageRelationship = async function createCarModelHasPrimeImageRelationship(carModelId, imageId) {
    return submitPostRequest("/car-models/" + carModelId + "/has-prime-image/" + imageId)
}

exports.ensureCarModelHasVariantRelationshipExists = async function ensureCarModelHasVariantRelationshipExists() {
    await this.ensureValidCarModelExists()
    await ensureValidCarModelVariantExists()
    await this.createCarModelHasVariantRelationship(bru.getEnvVar('validCarModelId'), bru.getEnvVar('validCarModelVariantId'))
}

exports.createCarModelHasVariantRelationship = async function createCarModelHasVariantRelationship(carModelId, carModelVariantId) {
    return submitPostRequest("/car-models/" + carModelId + "/has-variant/" + carModelVariantId)
}
