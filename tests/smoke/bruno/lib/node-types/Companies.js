const {post} = require("../apiRequest.js")

exports.createHasBrandRelationship = async function () {
    await post("/companies/" + bru.getEnvVar('validCompanyId') + "/has-brand/" + bru.getEnvVar('validBrandId'))
}

exports.createHasImageRelationship = async function () {
    await post("/companies/" + bru.getEnvVar('validCompanyId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/companies/" + bru.getEnvVar('validCompanyId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasVideoRelationship = async function () {
    await post("/companies/" + bru.getEnvVar('validCompanyId') + "/has-video/" + bru.getEnvVar('validVideoId'))
}

exports.createHasMainVideoRelationship = async function () {
    await post("/companies/" + bru.getEnvVar('validCompanyId') + "/has-main-video/" + bru.getEnvVar('validVideoId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/companies", {
        name: 'Dummy Company',
    })

    bru.setEnvVar('valid' + prefix + 'CompanyId', response.id)

    return response.attributes
}
