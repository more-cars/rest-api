const {post} = require("../apiRequest.js")

exports.create = async function (prefix = '') {
    const response = await post("/car-models", {
        name: 'Dummy Car Model',
    })
    const carModel = response.data
    bru.setEnvVar('valid' + prefix + 'CarModelId', carModel.id)

    return carModel
}

exports.createBelongsToBrandRelationship = async function () {
    await post("/car-models/" + bru.getEnvVar('validCarModelId') + "/belongs-to-brand/" + bru.getEnvVar('validBrandId'))
}

exports.createHasSuccessorRelationship = async function () {
    await post("/car-models/" + bru.getEnvVar('validCarModelId') + "/has-successor/" + bru.getEnvVar('validSecondCarModelId'))
}

exports.createIsSuccessorOfRelationship = async function () {
    await post("/car-models/" + bru.getEnvVar('validCarModelId') + "/is-successor-of/" + bru.getEnvVar('validSecondCarModelId'))
}

exports.createHasVariantRelationship = async function () {
    await post("/car-models/" + bru.getEnvVar('validCarModelId') + "/has-variant/" + bru.getEnvVar('validCarModelVariantId'))
}

exports.createHasImageRelationship = async function () {
    await post("/car-models/" + bru.getEnvVar('validCarModelId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/car-models/" + bru.getEnvVar('validCarModelId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}
