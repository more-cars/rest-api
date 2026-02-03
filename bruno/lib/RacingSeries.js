const {submitPostRequest, submitGetRequest} = require("./request")

exports.ensureValidRacingSeriesExists = async function () {
    if (!bru.getEnvVar('validRacingSeriesId')) {
        const nodeList = await this.getAllRacingSeries()
        if (nodeList.length > 0) {
            bru.setEnvVar("validRacingSeriesId", nodeList[0].data.id)
        } else {
            const newNode = await this.createRacingSeries()
            bru.setEnvVar("validRacingSeriesId", newNode.data.id)
        } //
    }
}

exports.createRacingSeries = async function () {
    return submitPostRequest("/racing-series", {
        name: 'Formula 1',
    })
}

exports.getAllRacingSeries = async function () {
    return submitGetRequest("/racing-series")
}

exports.ensureRacingSeriesHasRacingEventRelationshipExists = async function (racingSeriesId, racingEventId) {
    return submitPostRequest("/racing-series/" + racingSeriesId + "/has-racing-event/" + racingEventId)
}

exports.ensureRacingSeriesHasImageRelationshipExists = async function (racingSeriesId, imageId) {
    return submitPostRequest("/racing-series/" + racingSeriesId + "/has-image/" + imageId)
}

exports.ensureRacingSeriesHasPrimeImageRelationshipExists = async function (racingSeriesId, imageId) {
    return submitPostRequest("/racing-series/" + racingSeriesId + "/has-prime-image/" + imageId)
}
