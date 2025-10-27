const {submitPostRequest, submitGetRequest} = require("./request")
const {ensureValidBrandExists} = require("./Brands")
const {ensureValidImageExists} = require("./Images")

async function ensureValidCarModelExists() {
    if (!bru.getEnvVar('validCarModelId')) {
        const nodeList = await getAllCarModels()
        if (nodeList.length > 0) {
            bru.setEnvVar("validCarModelId", nodeList[0].data.id)
        } else {
            const newNode = await createCarModel()
            bru.setEnvVar("validCarModelId", newNode.data.id)
        }
    }
}

exports.ensureValidCarModelExists = ensureValidCarModelExists

async function ensureValidSecondCarModelExists() {
    const nodeList = await getAllCarModels()
    if (nodeList.length > 1) {
        bru.setEnvVar("validSecondCarModelId", nodeList[nodeList.length - 1].data.id)
    } else {
        const newNode = await createCarModel()
        bru.setEnvVar("validSecondCarModelId", newNode.data.id)
    }
}

exports.ensureValidSecondCarModelExists = ensureValidSecondCarModelExists

async function createCarModel() {
    return submitPostRequest("/car-models", {
        name: 'Dummy'
    })
}

exports.createCarModel = createCarModel

async function getAllCarModels() {
    return submitGetRequest("/car-models")
}

exports.getAllCarModels = getAllCarModels

async function ensureCarModelBelongsToBrandRelationshipExists() {
    await ensureValidCarModelExists()
    await ensureValidBrandExists()
    await createCarModelBelongsToBrandRelationship(bru.getEnvVar('validCarModelId'), bru.getEnvVar('validBrandId'))
}

exports.ensureCarModelBelongsToBrandRelationshipExists = ensureCarModelBelongsToBrandRelationshipExists

async function createCarModelBelongsToBrandRelationship(carModelId, brandId) {
    return submitPostRequest("/car-models/" + carModelId + "/belongs-to-brand/" + brandId)
}

exports.createCarModelBelongsToBrandRelationship = createCarModelBelongsToBrandRelationship

async function ensureCarModelHasSuccessorRelationshipExists() {
    await ensureValidCarModelExists()
    await ensureValidSecondCarModelExists()
    await createCarModelHasSuccessorRelationship(bru.getEnvVar('validCarModelId'), bru.getEnvVar('validSecondCarModelId'))
}

exports.ensureCarModelHasSuccessorRelationshipExists = ensureCarModelHasSuccessorRelationshipExists

async function createCarModelHasSuccessorRelationship(carModelId, partnerId) {
    return submitPostRequest("/car-models/" + carModelId + "/has-successor/" + partnerId)
}

exports.createCarModelHasSuccessorRelationship = createCarModelHasSuccessorRelationship

async function ensureCarModelIsSuccessorOfRelationshipExists() {
    await ensureValidCarModelExists()
    await ensureValidSecondCarModelExists()
    await createCarModelIsSuccessorOfRelationship(bru.getEnvVar('validCarModelId'), bru.getEnvVar('validSecondCarModelId'))
}

exports.ensureCarModelIsSuccessorOfRelationshipExists = ensureCarModelIsSuccessorOfRelationshipExists

async function createCarModelIsSuccessorOfRelationship(carModelId, partnerId) {
    return submitPostRequest("/car-models/" + carModelId + "/is-successor-of/" + partnerId)
}

exports.createCarModelIsSuccessorOfRelationship = createCarModelIsSuccessorOfRelationship

async function ensureCarModelHasImageRelationshipExists() {
    await ensureValidCarModelExists()
    await ensureValidImageExists()
    await createCarModelHasImageRelationship(bru.getEnvVar('validCarModelId'), bru.getEnvVar('validImageId'))
}

exports.ensureCarModelHasImageRelationshipExists = ensureCarModelHasImageRelationshipExists

async function createCarModelHasImageRelationship(carModelId, imageId) {
    return submitPostRequest("/car-models/" + carModelId + "/has-image/" + imageId)
}

exports.createCarModelHasImageRelationship = createCarModelHasImageRelationship

async function ensureCarModelHasPrimeImageRelationshipExists() {
    await ensureValidCarModelExists()
    await ensureValidImageExists()
    await createCarModelHasPrimeImageRelationship(bru.getEnvVar('validCarModelId'), bru.getEnvVar('validImageId'))
}

exports.ensureCarModelHasPrimeImageRelationshipExists = ensureCarModelHasPrimeImageRelationshipExists

async function createCarModelHasPrimeImageRelationship(carModelId, imageId) {
    return submitPostRequest("/car-models/" + carModelId + "/has-prime-image/" + imageId)
}

exports.createCarModelHasPrimeImageRelationship = createCarModelHasPrimeImageRelationship
