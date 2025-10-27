const {submitPostRequest, submitGetRequest} = require("./request")
const {ensureValidImageExists} = require("./Images")
const {ensureValidCarModelExists} = require("./CarModels")
const {ensureValidCompanyExists} = require("./Companies")

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
    return submitPostRequest("/brands", {
        name: 'Dummy'
    })
}

exports.createBrand = createBrand

async function getAllBrands() {
    return submitGetRequest("/brands")
}

exports.getAllBrands = getAllBrands

async function ensureBrandBelongsToCompanyRelationshipExists() {
    await ensureValidBrandExists()
    await ensureValidCompanyExists()
    await createBrandBelongsToCompanyRelationship(bru.getEnvVar('validBrandId'), bru.getEnvVar('validCompanyId'))
}

exports.ensureBrandBelongsToCompanyRelationshipExists = ensureBrandBelongsToCompanyRelationshipExists

async function createBrandBelongsToCompanyRelationship(brandId, companyId) {
    return submitPostRequest("/brands/" + brandId + "/belongs-to-company/" + companyId)
}

exports.createBrandBelongsToCompanyRelationship = createBrandBelongsToCompanyRelationship

async function ensureBrandHasCarModelRelationshipExists() {
    await ensureValidBrandExists()
    await ensureValidCarModelExists()
    await createBrandHasCarModelRelationship(bru.getEnvVar('validBrandId'), bru.getEnvVar('validCarModelId'))
}

exports.ensureBrandHasCarModelRelationshipExists = ensureBrandHasCarModelRelationshipExists

async function createBrandHasCarModelRelationship(brandId, carModelId) {
    return submitPostRequest("/brands/" + brandId + "/has-car-model/" + carModelId)
}

exports.createBrandHasCarModelRelationship = createBrandHasCarModelRelationship

async function ensureBrandHasImageRelationshipExists() {
    await ensureValidBrandExists()
    await ensureValidImageExists()
    await createBrandHasImageRelationship(bru.getEnvVar('validBrandId'), bru.getEnvVar('validImageId'))
}

exports.ensureBrandHasImageRelationshipExists = ensureBrandHasImageRelationshipExists

async function createBrandHasImageRelationship(brandId, imageId) {
    return submitPostRequest("/brands/" + brandId + "/has-image/" + imageId)
}

exports.createBrandHasImageRelationship = createBrandHasImageRelationship

async function ensureBrandHasPrimeImageRelationshipExists() {
    await ensureValidBrandExists()
    await ensureValidImageExists()
    await createBrandHasPrimeImageRelationship(bru.getEnvVar('validBrandId'), bru.getEnvVar('validImageId'))
}

exports.ensureBrandHasPrimeImageRelationshipExists = ensureBrandHasPrimeImageRelationshipExists

async function createBrandHasPrimeImageRelationship(brandId, imageId) {
    return submitPostRequest("/brands/" + brandId + "/has-prime-image/" + imageId)
}

exports.createBrandHasPrimeImageRelationship = createBrandHasPrimeImageRelationship
