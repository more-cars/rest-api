const axios = require("axios")
const {submitPostRequest} = require("./request")
const {ensureValidBrandExists} = require("./Brands")
const {ensureValidImageExists} = require("./Images")

async function ensureValidCompanyExists() {
    if (!bru.getEnvVar('validCompanyId')) {
        const nodeList = await getAllCompanies()
        if (nodeList.length > 0) {
            bru.setEnvVar("validCompanyId", nodeList[0].data.id)
        } else {
            const newNode = await createCompany()
            bru.setEnvVar("validCompanyId", newNode.data.id)
        } //
    }
}

exports.ensureValidCompanyExists = ensureValidCompanyExists

async function createCompany() {
    return submitPostRequest("/companies", {
        name: 'Dummy',
    })
}

exports.createCompany = createCompany

async function getAllCompanies() {
    const response = await axios.get(bru.getEnvVar('baseUrl') + "/companies")
    return response.data
}

exports.getAllCompanies = getAllCompanies

async function createCompanyHasBrandRelationship(companyId, brandId) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/companies/" + companyId + "/has-brand/" + brandId, null, {
        validateStatus: function (status) {
            return status < 400
        }
    })

    return response.data
}

exports.createCompanyHasBrandRelationship = createCompanyHasBrandRelationship

async function ensureCompanyHasBrandRelationshipExists() {
    await ensureValidCompanyExists()
    await ensureValidBrandExists()
    await createCompanyHasBrandRelationship(bru.getEnvVar('validCompanyId'), bru.getEnvVar('validBrandId'))
}

exports.ensureCompanyHasBrandRelationshipExists = ensureCompanyHasBrandRelationshipExists

async function createCompanyHasImageRelationship(companyId, imageId) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/companies/" + companyId + "/has-image/" + imageId, null, {
        validateStatus: function (status) {
            return status < 400
        }
    })

    return response.data
}

exports.createCompanyHasImageRelationship = createCompanyHasImageRelationship

async function ensureCompanyHasImageRelationshipExists() {
    await ensureValidCompanyExists()
    await ensureValidImageExists()
    await createCompanyHasImageRelationship(bru.getEnvVar('validCompanyId'), bru.getEnvVar('validImageId'))
}

exports.ensureCompanyHasImageRelationshipExists = ensureCompanyHasImageRelationshipExists

async function createCompanyHasPrimeImageRelationship(companyId, imageId) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/companies/" + companyId + "/has-prime-image/" + imageId, null, {
        validateStatus: function (status) {
            return status < 400
        }
    })

    return response.data
}

exports.createCompanyHasPrimeImageRelationship = createCompanyHasPrimeImageRelationship

async function ensureCompanyHasPrimeImageRelationshipExists() {
    await ensureValidCompanyExists()
    await ensureValidImageExists()
    await createCompanyHasPrimeImageRelationship(bru.getEnvVar('validCompanyId'), bru.getEnvVar('validImageId'))
}

exports.ensureCompanyHasPrimeImageRelationshipExists = ensureCompanyHasPrimeImageRelationshipExists
