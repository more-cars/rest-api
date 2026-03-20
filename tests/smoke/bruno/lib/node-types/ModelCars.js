const {post} = require("../apiRequest.js")

exports.createIsScaleModelOfCarModelVariantRelationship = async function () {
    await post("/model-cars/" + bru.getEnvVar('validModelCarId') + "/is-scale-model-of-car-model-variant/" + bru.getEnvVar('validCarModelVariantId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/model-cars", {
        name: 'Dummy Model Car',
    })

    bru.setEnvVar('valid' + prefix + 'ModelCarId', response.id)

    return response.attributes
}
