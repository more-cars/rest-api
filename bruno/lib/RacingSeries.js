const axios = require("axios")

async function ensureValidRacingSeriesExists() {
    if (!bru.getEnvVar('validRacingSeriesId')) {
        const newNode = await createRacingSeries()
        bru.setEnvVar("validRacingSeriesId", newNode.data.id)
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
