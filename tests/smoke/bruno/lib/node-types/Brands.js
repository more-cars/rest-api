const {post} = require("../apiRequest.js")

exports.createBrand = async function () {
    const response = await post("/brands", {
        name: 'Dummy Brand'
    })
    const brand = response.data
    bru.setEnvVar('validBrandId', brand.id)

    return brand
}

exports.createBrandBelongsToCompanyRelationship = async function () {
    await post("/brands/" + bru.getEnvVar('validBrandId') + "/belongs-to-company/" + bru.getEnvVar('validCompanyId'))
}

exports.createBrandHasCarModelRelationship = async function () {
    await post("/brands/" + bru.getEnvVar('validBrandId') + "/has-car-model/" + bru.getEnvVar('validCarModelId'))
}

exports.createBrandHasImageRelationship = async function () {
    await post("/brands/" + bru.getEnvVar('validBrandId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createBrandHasPrimeImageRelationship = async function () {
    await post("/brands/" + bru.getEnvVar('validBrandId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}
