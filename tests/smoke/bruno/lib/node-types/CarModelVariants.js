const {post} = require("../apiRequest.js")

exports.create = async function () {
    const response = await post("/car-model-variants", {
        name: 'Dummy Car Model Variant',
    })
    const carModelVariant = response.data
    bru.setEnvVar('validCarModelVariantId', carModelVariant.id)

    return carModelVariant
}

exports.createIsVariantOfRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/is-variant-of/" + bru.getEnvVar('validCarModelId'))
}

exports.createAchievedLapTimeRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/achieved-lap-time/" + bru.getEnvVar('validLapTimeId'))
}

exports.createAchievedSessionResultRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/achieved-session-result/" + bru.getEnvVar('validSessionResultId'))
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasImageRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/has-image/" + bru.getEnvVar('validImageId'))
}
