const {post} = require("../apiRequest.js")

exports.create = async function (prefix = '') {
    const response = await post("/session-results", {
        position: 1,
        driver_name: 'Dummy Session Result',
    })
    const sessionResult = response.data
    bru.setEnvVar('valid' + prefix + 'SessionResultId', sessionResult.id)

    return sessionResult
}
