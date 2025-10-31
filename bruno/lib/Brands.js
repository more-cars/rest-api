const {submitPostRequest, submitGetRequest} = require("./request")
const {ensureValidImageExists} = require("./Images")
const {ensureValidCarModelExists} = require("./CarModels")
const {ensureValidCompanyExists} = require("./Companies")

exports.ensureValidBrandExists = async function ensureValidBrandExists() {
    if (!bru.getEnvVar('validBrandId')) {
        const nodeList = await this.getAllBrands()
        if (nodeList.length > 0) {
            bru.setEnvVar("validBrandId", nodeList[0].data.id)
        } else {
            const newNode = await this.createBrand()
            bru.setEnvVar("validBrandId", newNode.data.id)
        }
    }
}

exports.createBrand = async function createBrand() {
    return submitPostRequest("/brands", {
        name: 'Dummy'
    })
}

exports.getAllBrands = async function getAllBrands() {
    return submitGetRequest("/brands")
}

exports.ensureBrandBelongsToCompanyRelationshipExists = async function ensureBrandBelongsToCompanyRelationshipExists() {
    await this.ensureValidBrandExists()
    await ensureValidCompanyExists()
    await this.createBrandBelongsToCompanyRelationship(bru.getEnvVar('validBrandId'), bru.getEnvVar('validCompanyId'))
}

exports.createBrandBelongsToCompanyRelationship = async function createBrandBelongsToCompanyRelationship(brandId, companyId) {
    return submitPostRequest("/brands/" + brandId + "/belongs-to-company/" + companyId)
}

exports.ensureBrandHasCarModelRelationshipExists = async function ensureBrandHasCarModelRelationshipExists() {
    await this.ensureValidBrandExists()
    await ensureValidCarModelExists()
    await this.createBrandHasCarModelRelationship(bru.getEnvVar('validBrandId'), bru.getEnvVar('validCarModelId'))
}

exports.createBrandHasCarModelRelationship = async function createBrandHasCarModelRelationship(brandId, carModelId) {
    return submitPostRequest("/brands/" + brandId + "/has-car-model/" + carModelId)
}

exports.ensureBrandHasImageRelationshipExists = async function ensureBrandHasImageRelationshipExists() {
    await this.ensureValidBrandExists()
    await ensureValidImageExists()
    await this.createBrandHasImageRelationship(bru.getEnvVar('validBrandId'), bru.getEnvVar('validImageId'))
}

exports.createBrandHasImageRelationship = async function createBrandHasImageRelationship(brandId, imageId) {
    return submitPostRequest("/brands/" + brandId + "/has-image/" + imageId)
}

exports.ensureBrandHasPrimeImageRelationshipExists = async function ensureBrandHasPrimeImageRelationshipExists() {
    await this.ensureValidBrandExists()
    await ensureValidImageExists()
    await this.createBrandHasPrimeImageRelationship(bru.getEnvVar('validBrandId'), bru.getEnvVar('validImageId'))
}

exports.createBrandHasPrimeImageRelationship = async function createBrandHasPrimeImageRelationship(brandId, imageId) {
    return submitPostRequest("/brands/" + brandId + "/has-prime-image/" + imageId)
}
