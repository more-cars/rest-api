const {submitPostRequest, submitGetRequest} = require("./request")

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

exports.ensureRaceTrackHasLayoutRelationshipExists = async function (raceTrackId, trackLayoutId) {
    return submitPostRequest("/race-tracks/" + raceTrackId + "/has-layout/" + trackLayoutId)
}

exports.ensureRaceTrackHasImageRelationshipExists = async function (raceTrackId, imageId) {
    return submitPostRequest("/race-tracks/" + raceTrackId + "/has-image/" + imageId)
}

exports.ensureRaceTrackHasPrimeImageRelationshipExists = async function (raceTrackId, imageId) {
    return submitPostRequest("/race-tracks/" + raceTrackId + "/has-prime-image/" + imageId)
}

exports.ensureRaceTrackHostedRacingEventRelationshipExists = async function (raceTrackId, racingEventId) {
    return submitPostRequest("/race-tracks/" + raceTrackId + "/hosted-racing-event/" + racingEventId)
}
