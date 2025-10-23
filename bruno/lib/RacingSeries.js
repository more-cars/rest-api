const axios = require("axios")

async function ensureValidRacingSeriesExists() {
    if (!bru.getEnvVar('validRacingSeriesId')) {
        const nodeList = await getAllRacingSeries()
        if (nodeList.length > 0) {
            bru.setEnvVar("validRacingSeriesId", nodeList[0].data.id)
        } else {
            const newNode = await createRacingSeries()
            bru.setEnvVar("validRacingSeriesId", newNode.data.id)
        } //
    }
}

exports.ensureValidRacingSeriesExists = ensureValidRacingSeriesExists

async function createRacingSeries() {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/racing-series", {
        name: 'Formula 1',
    })

    return response.data
}

exports.createRacingSeries = createRacingSeries

async function getAllRacingSeries() {
    const response = await axios.get(bru.getEnvVar('baseUrl') + "/racing-series")
    return response.data
}

exports.getAllRacingSeries = getAllRacingSeries
