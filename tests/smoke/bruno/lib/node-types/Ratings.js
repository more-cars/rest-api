const {post} = require("../apiRequest.js")

exports.create = async function (prefix = '') {
    const response = await post("/ratings", {
        name: 'Dummy Rating',
    })

    bru.setEnvVar('valid' + prefix + 'RatingId', response.id)

    return response.attributes
}
