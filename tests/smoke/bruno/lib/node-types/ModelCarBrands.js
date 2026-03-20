const {post} = require("../apiRequest.js")

exports.createCreatedModelCarRelationship = async function () {
    await post("/model-car-brands/" + bru.getEnvVar('validModelCarBrandId') + "/created-model-car/" + bru.getEnvVar('validModelCarId'))
}

exports.createHasImageRelationship = async function () {
    await post("/model-car-brands/" + bru.getEnvVar('validModelCarBrandId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/model-car-brands", {
        name: 'Dummy Model Car Brand',
    })

    bru.setEnvVar('valid' + prefix + 'ModelCarBrandId', response.id)

    return response.attributes
}
