const {submitPostRequest, submitGetRequest} = require("./request")
const {ensureValidBrandExists} = require("./Brands")
const {ensureValidImageExists} = require("./Images")

exports.ensureValidCompanyExists = async function () {
    if (!bru.getEnvVar('validCompanyId')) {
        const nodeList = await this.getAllCompanies()
        if (nodeList.length > 0) {
            bru.setEnvVar("validCompanyId", nodeList[0].data.id)
        } else {
            const newNode = await this.createCompany()
            bru.setEnvVar("validCompanyId", newNode.data.id)
        } //
    }
}

exports.createCompany = async function () {
    return submitPostRequest("/companies", {
        name: 'Dummy',
    })
}

exports.getAllCompanies = async function () {
    return submitGetRequest("/companies")
}

exports.createCompanyHasBrandRelationship = async function (companyId, brandId) {
    return submitPostRequest("/companies/" + companyId + "/has-brand/" + brandId)
}

exports.ensureCompanyHasBrandRelationshipExists = async function () {
    await this.ensureValidCompanyExists()
    await ensureValidBrandExists()
    await this.createCompanyHasBrandRelationship(bru.getEnvVar('validCompanyId'), bru.getEnvVar('validBrandId'))
}

exports.createCompanyHasImageRelationship = async function (companyId, imageId) {
    return submitPostRequest("/companies/" + companyId + "/has-image/" + imageId)
}

exports.ensureCompanyHasImageRelationshipExists = async function () {
    await this.ensureValidCompanyExists()
    await ensureValidImageExists()
    await this.createCompanyHasImageRelationship(bru.getEnvVar('validCompanyId'), bru.getEnvVar('validImageId'))
}

exports.createCompanyHasPrimeImageRelationship = async function (companyId, imageId) {
    return submitPostRequest("/companies/" + companyId + "/has-prime-image/" + imageId)
}

exports.ensureCompanyHasPrimeImageRelationshipExists = async function () {
    await this.ensureValidCompanyExists()
    await ensureValidImageExists()
    await this.createCompanyHasPrimeImageRelationship(bru.getEnvVar('validCompanyId'), bru.getEnvVar('validImageId'))
}
