const {post} = require("../apiRequest.js")

exports.createCreatedModelCarRelationship = async function () {
    await post("/model-car-brands/" + bru.getEnvVar('validModelCarBrandId') + "/created-model-car/" + bru.getEnvVar('validModelCarId'))
}

exports.createHasImageRelationship = async function () {
    await post("/model-car-brands/" + bru.getEnvVar('validModelCarBrandId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/model-car-brands/" + bru.getEnvVar('validModelCarBrandId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasVideoRelationship = async function () {
    await post("/model-car-brands/" + bru.getEnvVar('validModelCarBrandId') + "/has-video/" + bru.getEnvVar('validVideoId'))
}

exports.createHasMainVideoRelationship = async function () {
    await post("/model-car-brands/" + bru.getEnvVar('validModelCarBrandId') + "/has-main-video/" + bru.getEnvVar('validVideoId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/model-car-brands", {
        name: 'Dummy Model Car Brand',
    })

    bru.setEnvVar('valid' + prefix + 'ModelCarBrandId', response.id)

    return response.attributes
}
