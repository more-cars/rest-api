const {post} = require("../apiRequest.js")

exports.createPresentsCarModelVariantRelationship = async function () {
    await post("/motor-shows/" + bru.getEnvVar('validMotorShowId') + "/presents-car-model-variant/" + bru.getEnvVar('validCarModelVariantId'))
}

exports.createHasImageRelationship = async function () {
    await post("/motor-shows/" + bru.getEnvVar('validMotorShowId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/motor-shows", {
        name: 'Dummy Motor Show',
    })

    bru.setEnvVar('valid' + prefix + 'MotorShowId', response.id)

    return response.attributes
}
