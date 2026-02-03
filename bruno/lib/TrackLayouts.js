const {submitPostRequest, submitGetRequest} = require("./request")

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

exports.ensureTrackLayoutBelongsToRaceTrackRelationshipExists = async function (trackLayoutId, raceTrackId) {
    return submitPostRequest("/track-layouts/" + trackLayoutId + "/belongs-to-race-track/" + raceTrackId)
}

exports.ensureTrackLayoutWasUsedByRacingEventRelationshipExists = async function (trackLayoutId, racingEventId) {
    return submitPostRequest("/track-layouts/" + trackLayoutId + "/was-used-by-racing-event/" + racingEventId)
}

exports.ensureTrackLayoutHasImageRelationshipExists = async function (trackLayoutId, imageId) {
    return submitPostRequest("/track-layouts/" + trackLayoutId + "/has-image/" + imageId)
}

exports.ensureTrackLayoutHasPrimeImageRelationshipExists = async function (trackLayoutId, imageId) {
    return submitPostRequest("/track-layouts/" + trackLayoutId + "/has-prime-image/" + imageId)
}

exports.ensureTrackLayoutHasLapTimeRelationshipExists = async function (trackLayoutId, lapTimeId) {
    return submitPostRequest("/track-layouts/" + trackLayoutId + "/has-lap-time/" + lapTimeId)
}
