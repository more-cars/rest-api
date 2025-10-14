const axios = require("axios")
const {ensureValidImageExists} = require("./Images")
const {ensureValidCarModelExists} = require("./CarModels")

async function ensureValidBrandExists() {
    if (!bru.getEnvVar('validBrandId')) {
        const nodeList = await getAllBrands()
        if (nodeList.length > 0) {
            bru.setEnvVar("validBrandId", nodeList[0].data.id)
        } else {
            const newNode = await createBrand()
            bru.setEnvVar("validBrandId", newNode.data.id)
        }
    }
}

exports.ensureValidBrandExists = ensureValidBrandExists

async function createBrand() {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/brands", {
        name: 'Dummy'
    })
    return response.data
}

exports.createBrand = createBrand

async function getAllBrands() {
    const response = await axios.get(bru.getEnvVar('baseUrl') + "/brands")
    return response.data
}

exports.getAllBrands = getAllBrands

async function getBrandById(id) {
    const response = await axios.get(bru.getEnvVar('baseUrl') + "/brands/" + id)
    return response.data
}

exports.getBrandById = getBrandById

async function ensureBrandHasCarModelRelationshipExists() {
    await ensureValidBrandExists()
    await ensureValidCarModelExists()
    await createBrandHasCarModelRelationship(bru.getEnvVar('validBrandId'), bru.getEnvVar('validCarModelId'))
}

exports.ensureBrandHasCarModelRelationshipExists = ensureBrandHasCarModelRelationshipExists

async function createBrandHasCarModelRelationship(brandId, carModelId) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/brands/" + brandId + "/has-car-model/" + carModelId, null, {
        validateStatus: function (status) {
            return status < 400
        }
    })

    return response.data
}

exports.createBrandHasCarModelRelationship = createBrandHasCarModelRelationship

async function ensureBrandHasImageRelationshipExists() {
    await ensureValidBrandExists()
    await ensureValidImageExists()
    await createBrandHasImageRelationship(bru.getEnvVar('validBrandId'), bru.getEnvVar('validImageId'))
}

exports.ensureBrandHasImageRelationshipExists = ensureBrandHasImageRelationshipExists

async function createBrandHasImageRelationship(brandId, imageId) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/brands/" + brandId + "/has-image/" + imageId, null, {
        validateStatus: function (status) {
            return status < 400
        }
    })

    return response.data
}

exports.createBrandHasImageRelationship = createBrandHasImageRelationship

async function ensureBrandHasPrimeImageRelationshipExists() {
    await ensureValidBrandExists()
    await ensureValidImageExists()
    await createBrandHasPrimeImageRelationship(bru.getEnvVar('validBrandId'), bru.getEnvVar('validImageId'))
}

exports.ensureBrandHasPrimeImageRelationshipExists = ensureBrandHasPrimeImageRelationshipExists

async function createBrandHasPrimeImageRelationship(brandId, imageId) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/brands/" + brandId + "/has-prime-image/" + imageId, null, {
        validateStatus: function (status) {
            return status < 400
        }
    })

    return response.data
}

exports.createBrandHasPrimeImageRelationship = createBrandHasPrimeImageRelationship
