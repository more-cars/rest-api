const {post} = require("../apiRequest.js")

exports.create = async function (prefix = '') {
    const response = await post("/model-car-brands", {
        name: 'Dummy Model Car Brand',
    })

    bru.setEnvVar('valid' + prefix + 'ModelCarBrandId', response.id)

    return response.attributes
}
