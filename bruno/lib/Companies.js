const axios = require("axios")
const {ensureValidBrandExists} = require("./Brands")
const {ensureValidImageExists} = require("./Images")

async function ensureValidCompanyExists() {
    if (!bru.getEnvVar('validCompanyId')) {
        const newNode = await createCompany()
        bru.setEnvVar("validCompanyId", newNode.id)
    }
}

exports.ensureValidCompanyExists = ensureValidCompanyExists

async function createCompany() {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/companies", {
        name: 'Dummy',
    })

    return response.data
}

exports.createCompany = createCompany

async function createCompanyHasBrandRelationship(companyId, brandId) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/companies/" + companyId + "/has-brand/" + brandId)
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
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/companies/" + companyId + "/has-image/" + imageId)
    return response.data
}

exports.createCompanyHasImageRelationship = createCompanyHasImageRelationship

async function createCompanyHasPrimeImageRelationship(companyId, imageId) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/companies/" + companyId + "/has-prime-image/" + imageId)
    return response.data
}

exports.createCompanyHasPrimeImageRelationship = createCompanyHasPrimeImageRelationship

async function ensureCompanyHasPrimeImageRelationshipExists() {
    await ensureValidCompanyExists()
    await ensureValidImageExists()
    await createCompanyHasPrimeImageRelationship(bru.getEnvVar('validCompanyId'), bru.getEnvVar('validImageId'))
}

exports.ensureCompanyHasPrimeImageRelationshipExists = ensureCompanyHasPrimeImageRelationshipExists
