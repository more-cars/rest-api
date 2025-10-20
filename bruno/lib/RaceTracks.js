const axios = require("axios")

async function ensureValidRaceTrackExists() {
    if (!bru.getEnvVar('validRaceTrackId')) {
        const newNode = await createRaceTrack()
        bru.setEnvVar("validRaceTrackId", newNode.data.id)
    }
}

exports.ensureValidRaceTrackExists = ensureValidRaceTrackExists

async function createRaceTrack() {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/race-tracks", {
        name: 'Lausitzring',
    })

    return response.data
}

exports.createRaceTrack = createRaceTrack
