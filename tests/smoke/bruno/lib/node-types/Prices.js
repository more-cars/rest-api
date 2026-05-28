const {post} = require("../apiRequest.js")

exports.createForCarModelVariantRelationship = async function () {
    await post("/prices/" + bru.getEnvVar('validPriceId') + "/relationships/for-car-model-variant", {
        data: {
            type: "for-car-model-variant",
            id: bru.getEnvVar('validCarModelVariantId'),
        },
    })
}

exports.createHasImageRelationship = async function () {
    await post("/prices/" + bru.getEnvVar('validPriceId') + "/relationships/has-image", {
        data: {
            type: "has-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/prices/" + bru.getEnvVar('validPriceId') + "/relationships/has-prime-image", {
        data: {
            type: "has-prime-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
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
