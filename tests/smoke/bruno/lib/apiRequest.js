const axios = require("axios")

exports.post = async function (path, data) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + path, data, {
        validateStatus: function (status) {
            return status < 400
        },
    })

    return response.data
}
