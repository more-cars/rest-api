const axios = require("axios")
const {ensureValidTrackLayoutExists} = require("./TrackLayouts")

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

async function ensureRaceTrackHasLayoutRelationshipExists() {
    await ensureValidRaceTrackExists()
    await ensureValidTrackLayoutExists()
    await createRaceTrackHasLayoutRelationship(bru.getEnvVar('validRaceTrackId'), bru.getEnvVar('validTrackLayoutId'))
}

exports.ensureRaceTrackHasLayoutRelationshipExists = ensureRaceTrackHasLayoutRelationshipExists

async function createRaceTrackHasLayoutRelationship(raceTrackId, trackLayoutId) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/race-tracks/" + raceTrackId + "/has-layout/" + trackLayoutId, null, {
        validateStatus: function (status) {
            return status < 400
        }
    })

    return response.data
}

exports.createRaceTrackHasLayoutRelationship = createRaceTrackHasLayoutRelationship
