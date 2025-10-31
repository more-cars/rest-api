const {submitPostRequest, submitGetRequest} = require("./request")
const {ensureValidRaceTrackExists} = require("./RaceTracks")
const {ensureValidImageExists} = require("./Images")
const {ensureValidRacingEventExists} = require("./RacingEvents")
const {ensureValidLapTimeExists} = require("./LapTimes")

exports.ensureValidTrackLayoutExists = async function ensureValidTrackLayoutExists() {
    if (!bru.getEnvVar('validTrackLayoutId')) {
        const nodeList = await this.getAllTrackLayouts()
        if (nodeList.length > 0) {
            bru.setEnvVar("validTrackLayoutId", nodeList[0].data.id)
        } else {
            const newNode = await this.createTrackLayout()
            bru.setEnvVar("validTrackLayoutId", newNode.data.id)
        } //
    }
}

exports.createTrackLayout = async function createTrackLayout() {
    return submitPostRequest("/track-layouts", {
        name: 'GP Circuit',
    })
}

exports.getAllTrackLayouts = async function getAllTrackLayouts() {
    return submitGetRequest("/track-layouts")
}

exports.ensureTrackLayoutBelongsToRaceTrackRelationshipExists = async function ensureTrackLayoutBelongsToRaceTrackRelationshipExists() {
    await this.ensureValidTrackLayoutExists()
    await ensureValidRaceTrackExists()
    await this.createTrackLayoutBelongsToRaceTrackRelationship(bru.getEnvVar('validTrackLayoutId'), bru.getEnvVar('validRaceTrackId'))
}

exports.createTrackLayoutBelongsToRaceTrackRelationship = async function createTrackLayoutBelongsToRaceTrackRelationship(trackLayoutId, raceTrackId) {
    return submitPostRequest("/track-layouts/" + trackLayoutId + "/belongs-to-race-track/" + raceTrackId)
}

exports.ensureTrackLayoutWasUsedByRacingEventRelationshipExists = async function ensureTrackLayoutWasUsedByRacingEventRelationshipExists() {
    await this.ensureValidTrackLayoutExists()
    await ensureValidRacingEventExists()
    await this.createTrackLayoutWasUsedByRacingEventRelationship(bru.getEnvVar('validTrackLayoutId'), bru.getEnvVar('validRacingEventId'))
}

exports.createTrackLayoutWasUsedByRacingEventRelationship = async function createTrackLayoutWasUsedByRacingEventRelationship(trackLayoutId, racingEventId) {
    return submitPostRequest("/track-layouts/" + trackLayoutId + "/was-used-by-racing-event/" + racingEventId)
}


exports.ensureTrackLayoutHasImageRelationshipExists = async function ensureTrackLayoutHasImageRelationshipExists() {
    await this.ensureValidTrackLayoutExists()
    await ensureValidImageExists()
    await this.createTrackLayoutHasImageRelationship(bru.getEnvVar('validTrackLayoutId'), bru.getEnvVar('validImageId'))
}

exports.createTrackLayoutHasImageRelationship = async function createTrackLayoutHasImageRelationship(trackLayoutId, imageId) {
    return submitPostRequest("/track-layouts/" + trackLayoutId + "/has-image/" + imageId)
}

exports.ensureTrackLayoutHasPrimeImageRelationshipExists = async function ensureTrackLayoutHasPrimeImageRelationshipExists() {
    await this.ensureValidTrackLayoutExists()
    await ensureValidImageExists()
    await this.createTrackLayoutHasPrimeImageRelationship(bru.getEnvVar('validTrackLayoutId'), bru.getEnvVar('validImageId'))
}

exports.createTrackLayoutHasPrimeImageRelationship = async function createTrackLayoutHasPrimeImageRelationship(trackLayoutId, imageId) {
    return submitPostRequest("/track-layouts/" + trackLayoutId + "/has-prime-image/" + imageId)
}

exports.ensureTrackLayoutHasLapTimeRelationshipExists = async function ensureTrackLayoutHasLapTimeRelationshipExists() {
    await this.ensureValidTrackLayoutExists()
    await ensureValidLapTimeExists()
    await this.createTrackLayoutHasLapTimeRelationship(bru.getEnvVar('validTrackLayoutId'), bru.getEnvVar('validLapTimeId'))
}

exports.createTrackLayoutHasLapTimeRelationship = async function createTrackLayoutHasLapTimeRelationship(trackLayoutId, lapTimeId) {
    return submitPostRequest("/track-layouts/" + trackLayoutId + "/has-lap-time/" + lapTimeId)
}
