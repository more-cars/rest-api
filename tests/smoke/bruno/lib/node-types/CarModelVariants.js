const {post} = require("../apiRequest.js")

exports.createCarModelVariant = async function () {
    const response = await post("/car-model-variants", {
        name: 'Dummy Car Model Variant',
    })
    const carModelVariant = response.data
    bru.setEnvVar('validCarModelVariantId', carModelVariant.id)

    return carModelVariant
}
