const axios = require("axios")

async function ensureValidRaceTrackExists() {
    if (!bru.getEnvVar('validRaceTrackId')) {
        const nodeList = await getAllRaceTracks()
        if (nodeList.length > 0) {
            bru.setEnvVar("validRaceTrackId", nodeList[0].data.id)
        } else {
            const newNode = await createRaceTrack()
            bru.setEnvVar("validRaceTrackId", newNode.data.id)
        } //
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

async function getAllRaceTracks() {
    const response = await axios.get(bru.getEnvVar('baseUrl') + "/race-tracks")
    return response.data
}

exports.getAllRaceTracks = getAllRaceTracks
