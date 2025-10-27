const {submitPostRequest, submitGetRequest} = require("./request")
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
    return submitPostRequest("/race-tracks", {
        name: 'Lausitzring',
    })
}

exports.createRaceTrack = createRaceTrack

async function getAllRaceTracks() {
    return submitGetRequest("/race-tracks")
}

exports.getAllRaceTracks = getAllRaceTracks

async function ensureRaceTrackHasLayoutRelationshipExists() {
    await ensureValidRaceTrackExists()
    await ensureValidTrackLayoutExists()
    await createRaceTrackHasLayoutRelationship(bru.getEnvVar('validRaceTrackId'), bru.getEnvVar('validTrackLayoutId'))
}

exports.ensureRaceTrackHasLayoutRelationshipExists = ensureRaceTrackHasLayoutRelationshipExists

async function createRaceTrackHasLayoutRelationship(raceTrackId, trackLayoutId) {
    return submitPostRequest("/race-tracks/" + raceTrackId + "/has-layout/" + trackLayoutId)
}

exports.createRaceTrackHasLayoutRelationship = createRaceTrackHasLayoutRelationship

async function ensureRaceTrackHasImageRelationshipExists() {
    await ensureValidRaceTrackExists()
    await ensureValidImageExists()
    await createRaceTrackHasImageRelationship(bru.getEnvVar('validRaceTrackId'), bru.getEnvVar('validImageId'))
}

exports.ensureRaceTrackHasImageRelationshipExists = ensureRaceTrackHasImageRelationshipExists

async function createRaceTrackHasImageRelationship(raceTrackId, imageId) {
    return submitPostRequest("/race-tracks/" + raceTrackId + "/has-image/" + imageId)
}

exports.createRaceTrackHasImageRelationship = createRaceTrackHasImageRelationship

async function ensureRaceTrackHasPrimeImageRelationshipExists() {
    await ensureValidRaceTrackExists()
    await ensureValidImageExists()
    await createRaceTrackHasPrimeImageRelationship(bru.getEnvVar('validRaceTrackId'), bru.getEnvVar('validImageId'))
}

exports.ensureRaceTrackHasPrimeImageRelationshipExists = ensureRaceTrackHasPrimeImageRelationshipExists

async function createRaceTrackHasPrimeImageRelationship(raceTrackId, imageId) {
    return submitPostRequest("/race-tracks/" + raceTrackId + "/has-prime-image/" + imageId)
}

exports.createRaceTrackHasPrimeImageRelationship = createRaceTrackHasPrimeImageRelationship

async function ensureRaceTrackHostedRacingEventRelationshipExists() {
    await ensureValidRaceTrackExists()
    await ensureValidRacingEventExists()
    await createRaceTrackHostedRacingEventRelationship(bru.getEnvVar('validRaceTrackId'), bru.getEnvVar('validRacingEventId'))
}

exports.ensureRaceTrackHostedRacingEventRelationshipExists = ensureRaceTrackHostedRacingEventRelationshipExists

async function createRaceTrackHostedRacingEventRelationship(raceTrackId, racingEventId) {
    return submitPostRequest("/race-tracks/" + raceTrackId + "/hosted-racing-event/" + racingEventId)
}

exports.createRaceTrackHostedRacingEventRelationship = createRaceTrackHostedRacingEventRelationship
