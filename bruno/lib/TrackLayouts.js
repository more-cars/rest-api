const {submitPostRequest, submitGetRequest} = require("./request")
const {ensureValidRaceTrackExists} = require("./RaceTracks")
const {ensureValidImageExists} = require("./Images")
const {ensureValidRacingEventExists} = require("./RacingEvents")
const {ensureValidLapTimeExists} = require("./LapTimes")

async function ensureValidTrackLayoutExists() {
    if (!bru.getEnvVar('validTrackLayoutId')) {
        const nodeList = await getAllTrackLayouts()
        if (nodeList.length > 0) {
            bru.setEnvVar("validTrackLayoutId", nodeList[0].data.id)
        } else {
            const newNode = await createTrackLayout()
            bru.setEnvVar("validTrackLayoutId", newNode.data.id)
        } //
    }
}

exports.ensureValidTrackLayoutExists = ensureValidTrackLayoutExists

async function createTrackLayout() {
    return submitPostRequest("/track-layouts", {
        name: 'GP Circuit',
    })
}

exports.createTrackLayout = createTrackLayout

async function getAllTrackLayouts() {
    return submitGetRequest("/track-layouts")
}

exports.getAllTrackLayouts = getAllTrackLayouts

async function ensureTrackLayoutBelongsToRaceTrackRelationshipExists() {
    await ensureValidTrackLayoutExists()
    await ensureValidRaceTrackExists()
    await createTrackLayoutBelongsToRaceTrackRelationship(bru.getEnvVar('validTrackLayoutId'), bru.getEnvVar('validRaceTrackId'))
}

exports.ensureTrackLayoutBelongsToRaceTrackRelationshipExists = ensureTrackLayoutBelongsToRaceTrackRelationshipExists

async function createTrackLayoutBelongsToRaceTrackRelationship(trackLayoutId, raceTrackId) {
    return submitPostRequest("/track-layouts/" + trackLayoutId + "/belongs-to-race-track/" + raceTrackId)
}

exports.createTrackLayoutBelongsToRaceTrackRelationship = createTrackLayoutBelongsToRaceTrackRelationship

async function ensureTrackLayoutWasUsedByRacingEventRelationshipExists() {
    await ensureValidTrackLayoutExists()
    await ensureValidRacingEventExists()
    await createTrackLayoutWasUsedByRacingEventRelationship(bru.getEnvVar('validTrackLayoutId'), bru.getEnvVar('validRacingEventId'))
}

exports.ensureTrackLayoutWasUsedByRacingEventRelationshipExists = ensureTrackLayoutWasUsedByRacingEventRelationshipExists

async function createTrackLayoutWasUsedByRacingEventRelationship(trackLayoutId, racingEventId) {
    return submitPostRequest("/track-layouts/" + trackLayoutId + "/was-used-by-racing-event/" + racingEventId)
}

exports.createTrackLayoutWasUsedByRacingEventRelationship = createTrackLayoutWasUsedByRacingEventRelationship


async function ensureTrackLayoutHasImageRelationshipExists() {
    await ensureValidTrackLayoutExists()
    await ensureValidImageExists()
    await createTrackLayoutHasImageRelationship(bru.getEnvVar('validTrackLayoutId'), bru.getEnvVar('validImageId'))
}

exports.ensureTrackLayoutHasImageRelationshipExists = ensureTrackLayoutHasImageRelationshipExists

async function createTrackLayoutHasImageRelationship(trackLayoutId, imageId) {
    return submitPostRequest("/track-layouts/" + trackLayoutId + "/has-image/" + imageId)
}

exports.createTrackLayoutHasImageRelationship = createTrackLayoutHasImageRelationship

async function ensureTrackLayoutHasPrimeImageRelationshipExists() {
    await ensureValidTrackLayoutExists()
    await ensureValidImageExists()
    await createTrackLayoutHasPrimeImageRelationship(bru.getEnvVar('validTrackLayoutId'), bru.getEnvVar('validImageId'))
}

exports.ensureTrackLayoutHasPrimeImageRelationshipExists = ensureTrackLayoutHasPrimeImageRelationshipExists

async function createTrackLayoutHasPrimeImageRelationship(trackLayoutId, imageId) {
    return submitPostRequest("/track-layouts/" + trackLayoutId + "/has-prime-image/" + imageId)
}

exports.createTrackLayoutHasPrimeImageRelationship = createTrackLayoutHasPrimeImageRelationship

async function ensureTrackLayoutHasLapTimeRelationshipExists() {
    await ensureValidTrackLayoutExists()
    await ensureValidLapTimeExists()
    await createTrackLayoutHasLapTimeRelationship(bru.getEnvVar('validTrackLayoutId'), bru.getEnvVar('validLapTimeId'))
}

exports.ensureTrackLayoutHasLapTimeRelationshipExists = ensureTrackLayoutHasLapTimeRelationshipExists

async function createTrackLayoutHasLapTimeRelationship(trackLayoutId, lapTimeId) {
    return submitPostRequest("/track-layouts/" + trackLayoutId + "/has-lap-time/" + lapTimeId)
}

exports.createTrackLayoutHasLapTimeRelationship = createTrackLayoutHasLapTimeRelationship
