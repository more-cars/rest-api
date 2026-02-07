const {post} = require("../apiRequest.js")

exports.createSessionResult = async function () {
    const response = await post("/session-results", {
        position: 1,
        driver_name: 'Dummy Session Result',
    })
    const sessionResult = response.data
    bru.setEnvVar('validSessionResultId', sessionResult.id)

    return sessionResult
}
