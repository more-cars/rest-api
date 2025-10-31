const {submitPostRequest, submitGetRequest} = require("./request")
const {ensureValidRaceTrackExists} = require("./RaceTracks")
const {ensureValidImageExists} = require("./Images")
const {ensureValidRacingEventExists} = require("./RacingEvents")
const {ensureValidLapTimeExists} = require("./LapTimes")

exports.ensureValidTrackLayoutExists = async function () {
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

exports.createTrackLayout = async function () {
    return submitPostRequest("/track-layouts", {
        name: 'GP Circuit',
    })
}

exports.getAllTrackLayouts = async function () {
    return submitGetRequest("/track-layouts")
}

exports.ensureTrackLayoutBelongsToRaceTrackRelationshipExists = async function () {
    await this.ensureValidTrackLayoutExists()
    await ensureValidRaceTrackExists()
    await this.createTrackLayoutBelongsToRaceTrackRelationship(bru.getEnvVar('validTrackLayoutId'), bru.getEnvVar('validRaceTrackId'))
}

exports.createTrackLayoutBelongsToRaceTrackRelationship = async function (trackLayoutId, raceTrackId) {
    return submitPostRequest("/track-layouts/" + trackLayoutId + "/belongs-to-race-track/" + raceTrackId)
}

exports.ensureTrackLayoutWasUsedByRacingEventRelationshipExists = async function () {
    await this.ensureValidTrackLayoutExists()
    await ensureValidRacingEventExists()
    await this.createTrackLayoutWasUsedByRacingEventRelationship(bru.getEnvVar('validTrackLayoutId'), bru.getEnvVar('validRacingEventId'))
}

exports.createTrackLayoutWasUsedByRacingEventRelationship = async function (trackLayoutId, racingEventId) {
    return submitPostRequest("/track-layouts/" + trackLayoutId + "/was-used-by-racing-event/" + racingEventId)
}


exports.ensureTrackLayoutHasImageRelationshipExists = async function () {
    await this.ensureValidTrackLayoutExists()
    await ensureValidImageExists()
    await this.createTrackLayoutHasImageRelationship(bru.getEnvVar('validTrackLayoutId'), bru.getEnvVar('validImageId'))
}

exports.createTrackLayoutHasImageRelationship = async function (trackLayoutId, imageId) {
    return submitPostRequest("/track-layouts/" + trackLayoutId + "/has-image/" + imageId)
}

exports.ensureTrackLayoutHasPrimeImageRelationshipExists = async function () {
    await this.ensureValidTrackLayoutExists()
    await ensureValidImageExists()
    await this.createTrackLayoutHasPrimeImageRelationship(bru.getEnvVar('validTrackLayoutId'), bru.getEnvVar('validImageId'))
}

exports.createTrackLayoutHasPrimeImageRelationship = async function (trackLayoutId, imageId) {
    return submitPostRequest("/track-layouts/" + trackLayoutId + "/has-prime-image/" + imageId)
}

exports.ensureTrackLayoutHasLapTimeRelationshipExists = async function () {
    await this.ensureValidTrackLayoutExists()
    await ensureValidLapTimeExists()
    await this.createTrackLayoutHasLapTimeRelationship(bru.getEnvVar('validTrackLayoutId'), bru.getEnvVar('validLapTimeId'))
}

exports.createTrackLayoutHasLapTimeRelationship = async function (trackLayoutId, lapTimeId) {
    return submitPostRequest("/track-layouts/" + trackLayoutId + "/has-lap-time/" + lapTimeId)
}
