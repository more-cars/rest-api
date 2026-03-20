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
        price: 59990,
        price_year: 2020,
        currency_code: "EUR",
        country_code: "DE",
    })

    bru.setEnvVar('valid' + prefix + 'PriceId', response.id)

    return response.attributes
}
