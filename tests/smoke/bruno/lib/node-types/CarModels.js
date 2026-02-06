const {post} = require("../apiRequest.js")

exports.createCarModel = async function () {
    const response = await post("/car-models", {
        name: 'Dummy Car Model'
    })
    const carModel = response.data
    bru.setEnvVar('validCarModelId', carModel.id)

    return carModel
}
