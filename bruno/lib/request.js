const axios = require("axios")

async function submitPostRequest(path, data) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + path, data)

    return response.data
}

exports.submitPostRequest = submitPostRequest
