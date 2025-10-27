const {submitPostRequest, submitGetRequest} = require("./request")
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
    return submitGetRequest("/companies")
}

exports.getAllCompanies = getAllCompanies

async function createCompanyHasBrandRelationship(companyId, brandId) {
    return submitPostRequest("/companies/" + companyId + "/has-brand/" + brandId)
}

exports.createCompanyHasBrandRelationship = createCompanyHasBrandRelationship

async function ensureCompanyHasBrandRelationshipExists() {
    await ensureValidCompanyExists()
    await ensureValidBrandExists()
    await createCompanyHasBrandRelationship(bru.getEnvVar('validCompanyId'), bru.getEnvVar('validBrandId'))
}

exports.ensureCompanyHasBrandRelationshipExists = ensureCompanyHasBrandRelationshipExists

async function createCompanyHasImageRelationship(companyId, imageId) {
    return submitPostRequest("/companies/" + companyId + "/has-image/" + imageId)
}

exports.createCompanyHasImageRelationship = createCompanyHasImageRelationship

async function ensureCompanyHasImageRelationshipExists() {
    await ensureValidCompanyExists()
    await ensureValidImageExists()
    await createCompanyHasImageRelationship(bru.getEnvVar('validCompanyId'), bru.getEnvVar('validImageId'))
}

exports.ensureCompanyHasImageRelationshipExists = ensureCompanyHasImageRelationshipExists

async function createCompanyHasPrimeImageRelationship(companyId, imageId) {
    return submitPostRequest("/companies/" + companyId + "/has-prime-image/" + imageId)
}

exports.createCompanyHasPrimeImageRelationship = createCompanyHasPrimeImageRelationship

async function ensureCompanyHasPrimeImageRelationshipExists() {
    await ensureValidCompanyExists()
    await ensureValidImageExists()
    await createCompanyHasPrimeImageRelationship(bru.getEnvVar('validCompanyId'), bru.getEnvVar('validImageId'))
}

exports.ensureCompanyHasPrimeImageRelationshipExists = ensureCompanyHasPrimeImageRelationshipExists
