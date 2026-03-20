const {post} = require("../apiRequest.js")

exports.createCreatedModelCarRelationship = async function () {
    await post("/model-car-brands/" + bru.getEnvVar('validModelCarBrandId') + "/created-model-car/" + bru.getEnvVar('validModelCarId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/model-car-brands", {
        name: 'Dummy Model Car Brand',
    })

    bru.setEnvVar('valid' + prefix + 'ModelCarBrandId', response.id)

    return response.attributes
}
