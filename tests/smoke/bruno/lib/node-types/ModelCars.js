const {post} = require("../apiRequest.js")

exports.create = async function (prefix = '') {
    const response = await post("/model-cars", {
        name: 'Dummy Model Car',
    })

    bru.setEnvVar('valid' + prefix + 'ModelCarId', response.id)

    return response.attributes
}
