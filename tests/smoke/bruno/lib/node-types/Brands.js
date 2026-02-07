const {post} = require("../apiRequest.js")

exports.create = async function () {
    const response = await post("/brands", {
        name: 'Dummy Brand',
    })
    const brand = response.data
    bru.setEnvVar('validBrandId', brand.id)

    return brand
}

exports.createBelongsToCompanyRelationship = async function () {
    await post("/brands/" + bru.getEnvVar('validBrandId') + "/belongs-to-company/" + bru.getEnvVar('validCompanyId'))
}

exports.createHasCarModelRelationship = async function () {
    await post("/brands/" + bru.getEnvVar('validBrandId') + "/has-car-model/" + bru.getEnvVar('validCarModelId'))
}

exports.createHasImageRelationship = async function () {
    await post("/brands/" + bru.getEnvVar('validBrandId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/brands/" + bru.getEnvVar('validBrandId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}
