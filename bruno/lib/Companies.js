const axios = require("axios")

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

async function createCompanyHasPrimeImageRelationship(companyId, imageId) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/companies/" + companyId + "/has-prime-image/" + imageId)
    return response.data
}

exports.createCompanyHasPrimeImageRelationship = createCompanyHasPrimeImageRelationship
