const axios = require("axios")

async function ensureValidTrackLayoutExists() {
    if (!bru.getEnvVar('validTrackLayoutId')) {
        const newNode = await createTrackLayout()
        bru.setEnvVar("validTrackLayoutId", newNode.data.id)
    }
}

exports.ensureValidTrackLayoutExists = ensureValidTrackLayoutExists

async function createTrackLayout() {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/track-layouts", {
        name: 'GP Circuit',
    })

    return response.data
}

exports.createTrackLayout = createTrackLayout
