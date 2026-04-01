const {post} = require("../apiRequest.js")

exports.createPresentsCarModelVariantRelationship = async function () {
    await post("/motor-shows/" + bru.getEnvVar('validMotorShowId') + "/presents-car-model-variant/" + bru.getEnvVar('validCarModelVariantId'))
}

exports.createHasImageRelationship = async function () {
    await post("/motor-shows/" + bru.getEnvVar('validMotorShowId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/motor-shows/" + bru.getEnvVar('validMotorShowId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasVideoRelationship = async function () {
    await post("/motor-shows/" + bru.getEnvVar('validMotorShowId') + "/has-video/" + bru.getEnvVar('validVideoId'))
}

exports.createHasMainVideoRelationship = async function () {
    await post("/motor-shows/" + bru.getEnvVar('validMotorShowId') + "/has-main-video/" + bru.getEnvVar('validVideoId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/motor-shows", {
        name: 'Dummy Motor Show',
    })

    bru.setEnvVar('valid' + prefix + 'MotorShowId', response.id)

    return response.attributes
}
