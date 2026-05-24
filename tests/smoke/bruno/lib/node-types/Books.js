const {post} = require("../apiRequest.js")

exports.create = async function (prefix = '') {
    const response = await post("/books", {
        title: 'Dummy Book',
    })

    bru.setEnvVar('valid' + prefix + 'BookId', response.id)

    return response.attributes
}
