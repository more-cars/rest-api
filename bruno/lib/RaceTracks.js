const {submitPostRequest, submitGetRequest} = require("./request")
const {ensureValidTrackLayoutExists} = require("./TrackLayouts")
const {ensureValidImageExists} = require("./Images")
const {ensureValidRacingEventExists} = require("./RacingEvents")

exports.ensureValidRaceTrackExists = async function () {
    if (!bru.getEnvVar('validRaceTrackId')) {
        const nodeList = await this.getAllRaceTracks()
        if (nodeList.length > 0) {
            bru.setEnvVar("validRaceTrackId", nodeList[0].data.id)
        } else {
            const newNode = await this.createRaceTrack()
            bru.setEnvVar("validRaceTrackId", newNode.data.id)
        } //
    }
}

exports.createRaceTrack = async function () {
    return submitPostRequest("/race-tracks", {
        name: 'Lausitzring',
    })
}

exports.getAllRaceTracks = async function () {
    return submitGetRequest("/race-tracks")
}

exports.ensureRaceTrackHasLayoutRelationshipExists = async function () {
    await this.ensureValidRaceTrackExists()
    await ensureValidTrackLayoutExists()
    await this.createRaceTrackHasLayoutRelationship(bru.getEnvVar('validRaceTrackId'), bru.getEnvVar('validTrackLayoutId'))
}

exports.createRaceTrackHasLayoutRelationship = async function (raceTrackId, trackLayoutId) {
    return submitPostRequest("/race-tracks/" + raceTrackId + "/has-layout/" + trackLayoutId)
}

exports.ensureRaceTrackHasImageRelationshipExists = async function () {
    await this.ensureValidRaceTrackExists()
    await ensureValidImageExists()
    await this.createRaceTrackHasImageRelationship(bru.getEnvVar('validRaceTrackId'), bru.getEnvVar('validImageId'))
}

exports.createRaceTrackHasImageRelationship = async function (raceTrackId, imageId) {
    return submitPostRequest("/race-tracks/" + raceTrackId + "/has-image/" + imageId)
}

exports.ensureRaceTrackHasPrimeImageRelationshipExists = async function () {
    await this.ensureValidRaceTrackExists()
    await ensureValidImageExists()
    await this.createRaceTrackHasPrimeImageRelationship(bru.getEnvVar('validRaceTrackId'), bru.getEnvVar('validImageId'))
}

exports.createRaceTrackHasPrimeImageRelationship = async function (raceTrackId, imageId) {
    return submitPostRequest("/race-tracks/" + raceTrackId + "/has-prime-image/" + imageId)
}

exports.ensureRaceTrackHostedRacingEventRelationshipExists = async function () {
    await this.ensureValidRaceTrackExists()
    await ensureValidRacingEventExists()
    await this.createRaceTrackHostedRacingEventRelationship(bru.getEnvVar('validRaceTrackId'), bru.getEnvVar('validRacingEventId'))
}

exports.createRaceTrackHostedRacingEventRelationship = async function (raceTrackId, racingEventId) {
    return submitPostRequest("/race-tracks/" + raceTrackId + "/hosted-racing-event/" + racingEventId)
}
