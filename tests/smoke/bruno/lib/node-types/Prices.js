const {post} = require("../apiRequest.js")

exports.createForCarModelVariantRelationship = async function () {
    await post("/prices/" + bru.getEnvVar('validPriceId') + "/for-car-model-variant/" + bru.getEnvVar('validCarModelVariantId'))
}

exports.createHasImageRelationship = async function () {
    await post("/prices/" + bru.getEnvVar('validPriceId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/prices/" + bru.getEnvVar('validPriceId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/prices", {
        name: 'Dummy Price',
    })

    bru.setEnvVar('valid' + prefix + 'PriceId', response.id)

    return response.attributes
}
