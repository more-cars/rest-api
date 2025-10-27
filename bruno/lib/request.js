const axios = require("axios")

async function submitPostRequest(path, data) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + path, data)

    return response.data
}

exports.submitPostRequest = submitPostRequest

async function submitGetRequest(path) {
    const response = await axios.get(bru.getEnvVar('baseUrl') + path)

    return response.data
}

exports.submitGetRequest = submitGetRequest
