const {post} = require("../apiRequest.js")

exports.createIsScaleModelOfCarModelVariantRelationship = async function () {
    await post("/model-cars/" + bru.getEnvVar('validModelCarId') + "/is-scale-model-of-car-model-variant/" + bru.getEnvVar('validCarModelVariantId'))
}

exports.createMadeByModelCarBrandRelationship = async function () {
    await post("/model-cars/" + bru.getEnvVar('validModelCarId') + "/made-by-model-car-brand/" + bru.getEnvVar('validModelCarBrandId'))
}

exports.createHasImageRelationship = async function () {
    await post("/model-cars/" + bru.getEnvVar('validModelCarId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/model-cars/" + bru.getEnvVar('validModelCarId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasVideoRelationship = async function () {
    await post("/model-cars/" + bru.getEnvVar('validModelCarId') + "/has-video/" + bru.getEnvVar('validVideoId'))
}

exports.createHasMainVideoRelationship = async function () {
    await post("/model-cars/" + bru.getEnvVar('validModelCarId') + "/has-main-video/" + bru.getEnvVar('validVideoId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/model-cars", {
        name: 'Dummy Model Car',
    })

    bru.setEnvVar('valid' + prefix + 'ModelCarId', response.id)

    return response.attributes
}
