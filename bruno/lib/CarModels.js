const axios = require("axios")
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
    if (!bru.getEnvVar('validSecondCarModelId')) {
        const nodeList = await getAllCarModels()
        if (nodeList.length > 1) {
            bru.setEnvVar("validSecondCarModelId", nodeList[1].data.id)
        } else {
            const newNode = await createCarModel()
            bru.setEnvVar("validSecondCarModelId", newNode.data.id)
        }
    }
}

exports.ensureValidSecondCarModelExists = ensureValidSecondCarModelExists

async function createCarModel() {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/car-models", {
        name: 'Dummy'
    })
    return response.data
}

exports.createCarModel = createCarModel

async function getAllCarModels() {
    const response = await axios.get(bru.getEnvVar('baseUrl') + "/car-models")
    return response.data
}

exports.getAllCarModels = getAllCarModels

async function getCarModelById(id) {
    const response = await axios.get(bru.getEnvVar('baseUrl') + "/car-models/" + id)
    return response.data
}

exports.getCarModelById = getCarModelById

async function ensureCarModelBelongsToBrandRelationshipExists() {
    await ensureValidCarModelExists()
    await ensureValidBrandExists()
    await createCarModelBelongsToBrandRelationship(bru.getEnvVar('validCarModelId'), bru.getEnvVar('validBrandId'))
}

exports.ensureCarModelBelongsToBrandRelationshipExists = ensureCarModelBelongsToBrandRelationshipExists

async function createCarModelBelongsToBrandRelationship(carModelId, brandId) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/car-models/" + carModelId + "/belongs-to-brand/" + brandId, null, {
        validateStatus: function (status) {
            return status < 400
        }
    })

    return response.data
}

exports.createCarModelBelongsToBrandRelationship = createCarModelBelongsToBrandRelationship

async function ensureCarModelHasImageRelationshipExists() {
    await ensureValidCarModelExists()
    await ensureValidImageExists()
    await createCarModelHasImageRelationship(bru.getEnvVar('validCarModelId'), bru.getEnvVar('validImageId'))
}

exports.ensureCarModelHasImageRelationshipExists = ensureCarModelHasImageRelationshipExists

async function createCarModelHasImageRelationship(carModelId, imageId) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/car-models/" + carModelId + "/has-image/" + imageId, null, {
        validateStatus: function (status) {
            return status < 400
        }
    })

    return response.data
}

exports.createCarModelHasImageRelationship = createCarModelHasImageRelationship

async function ensureCarModelHasPrimeImageRelationshipExists() {
    await ensureValidCarModelExists()
    await ensureValidImageExists()
    await createCarModelHasPrimeImageRelationship(bru.getEnvVar('validCarModelId'), bru.getEnvVar('validImageId'))
}

exports.ensureCarModelHasPrimeImageRelationshipExists = ensureCarModelHasPrimeImageRelationshipExists

async function createCarModelHasPrimeImageRelationship(carModelId, imageId) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/car-models/" + carModelId + "/has-prime-image/" + imageId, null, {
        validateStatus: function (status) {
            return status < 400
        }
    })

    return response.data
}

exports.createCarModelHasPrimeImageRelationship = createCarModelHasPrimeImageRelationship
