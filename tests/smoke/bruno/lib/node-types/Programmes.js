const {post} = require("../apiRequest.js")

exports.create = async function (prefix = '') {
    const response = await post("/programmes", {
        name: 'Dummy Programme',
    })

    bru.setEnvVar('valid' + prefix + 'ProgrammeId', response.id)

    return response.attributes
}
