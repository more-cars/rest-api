const {post} = require("../apiRequest.js")

exports.create = async function (prefix = '') {
    const response = await post("/prices", {
        name: 'Dummy Price',
    })

    bru.setEnvVar('valid' + prefix + 'PriceId', response.id)

    return response.attributes
}
