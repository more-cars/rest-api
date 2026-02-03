const {submitPostRequest, submitGetRequest} = require("./request")

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

exports.ensureCompanyHasBrandRelationshipExists = async function (companyId, brandId) {
    return submitPostRequest("/companies/" + companyId + "/has-brand/" + brandId)
}

exports.ensureCompanyHasImageRelationshipExists = async function (companyId, imageId) {
    return submitPostRequest("/companies/" + companyId + "/has-image/" + imageId)
}

exports.ensureCompanyHasPrimeImageRelationshipExists = async function (companyId, imageId) {
    return submitPostRequest("/companies/" + companyId + "/has-prime-image/" + imageId)
}
