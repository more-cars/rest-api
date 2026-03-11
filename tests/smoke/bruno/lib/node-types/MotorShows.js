const {post} = require("../apiRequest.js")

exports.create = async function (prefix = '') {
    const response = await post("/motor-shows", {
        name: 'Dummy Motor Show',
    })

    bru.setEnvVar('valid' + prefix + 'MotorShowId', response.id)

    return response.attributes
}
