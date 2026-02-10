const {post} = require("../apiRequest.js")

exports.create = async function (prefix = '') {
    const response = await post("/companies", {
        name: 'Dummy Company',
    })
    const company = response.data
    bru.setEnvVar('valid' + prefix + 'CompanyId', company.id)

    return company
}

exports.createHasBrandRelationship = async function () {
    await post("/companies/" + bru.getEnvVar('validCompanyId') + "/has-brand/" + bru.getEnvVar('validBrandId'))
}

exports.createHasImageRelationship = async function () {
    await post("/companies/" + bru.getEnvVar('validCompanyId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/companies/" + bru.getEnvVar('validCompanyId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}
