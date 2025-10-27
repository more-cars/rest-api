const axios = require("axios")
const https = require("https")

const agent = new https.Agent({
    rejectUnauthorized: false
})

async function submitPostRequest(path, data) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + path, data, {
        validateStatus: function (status) {
            return status < 400
        },
        httpsAgent: agent,
    })

    return response.data
}

exports.submitPostRequest = submitPostRequest

async function submitGetRequest(path) {
    const response = await axios.get(bru.getEnvVar('baseUrl') + path, {
        httpsAgent: agent,
    })

    return response.data
}

exports.submitGetRequest = submitGetRequest
