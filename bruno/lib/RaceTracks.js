const axios = require("axios")
const {ensureValidTrackLayoutExists} = require("./TrackLayouts")
const {ensureValidImageExists} = require("./Images")
const {ensureValidRacingEventExists} = require("./RacingEvents")

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

async function ensureRaceTrackHasImageRelationshipExists() {
    await ensureValidRaceTrackExists()
    await ensureValidImageExists()
    await createRaceTrackHasImageRelationship(bru.getEnvVar('validRaceTrackId'), bru.getEnvVar('validImageId'))
}

exports.ensureRaceTrackHasImageRelationshipExists = ensureRaceTrackHasImageRelationshipExists

async function createRaceTrackHasImageRelationship(raceTrackId, imageId) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/race-tracks/" + raceTrackId + "/has-image/" + imageId, null, {
        validateStatus: function (status) {
            return status < 400
        }
    })

    return response.data
}

exports.createRaceTrackHasImageRelationship = createRaceTrackHasImageRelationship

async function ensureRaceTrackHasPrimeImageRelationshipExists() {
    await ensureValidRaceTrackExists()
    await ensureValidImageExists()
    await createRaceTrackHasPrimeImageRelationship(bru.getEnvVar('validRaceTrackId'), bru.getEnvVar('validImageId'))
}

exports.ensureRaceTrackHasPrimeImageRelationshipExists = ensureRaceTrackHasPrimeImageRelationshipExists

async function createRaceTrackHasPrimeImageRelationship(raceTrackId, imageId) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/race-tracks/" + raceTrackId + "/has-prime-image/" + imageId, null, {
        validateStatus: function (status) {
            return status < 400
        }
    })

    return response.data
}

exports.createRaceTrackHasPrimeImageRelationship = createRaceTrackHasPrimeImageRelationship

async function ensureRaceTrackHostedRacingEventRelationshipExists() {
    await ensureValidRaceTrackExists()
    await ensureValidRacingEventExists()
    await createRaceTrackHostedRacingEventRelationship(bru.getEnvVar('validRaceTrackId'), bru.getEnvVar('validRacingEventId'))
}

exports.ensureRaceTrackHostedRacingEventRelationshipExists = ensureRaceTrackHostedRacingEventRelationshipExists

async function createRaceTrackHostedRacingEventRelationship(raceTrackId, racingEventId) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/race-tracks/" + raceTrackId + "/hosted-racing-event/" + racingEventId, null, {
        validateStatus: function (status) {
            return status < 400
        }
    })

    return response.data
}

exports.createRaceTrackHostedRacingEventRelationship = createRaceTrackHostedRacingEventRelationship
