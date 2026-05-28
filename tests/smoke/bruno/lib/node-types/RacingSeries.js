const {post} = require("../apiRequest.js")

exports.createHasRacingEventRelationship = async function () {
    await post("/racing-series/" + bru.getEnvVar('validRacingSeriesId') + "/relationships/has-racing-event", {
        data: {
            type: "has-racing-event",
            id: bru.getEnvVar('validRacingEventId'),
        },
    })
}

exports.createHasImageRelationship = async function () {
    await post("/racing-series/" + bru.getEnvVar('validRacingSeriesId') + "/relationships/has-image", {
        data: {
            type: "has-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/racing-series/" + bru.getEnvVar('validRacingSeriesId') + "/relationships/has-prime-image", {
        data: {
            type: "has-prime-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasVideoRelationship = async function () {
    await post("/racing-series/" + bru.getEnvVar('validRacingSeriesId') + "/relationships/has-video", {
        data: {
            type: "has-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.createHasMainVideoRelationship = async function () {
    await post("/racing-series/" + bru.getEnvVar('validRacingSeriesId') + "/relationships/has-main-video", {
        data: {
            type: "has-main-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.create = async function (prefix = '') {
    const response = await post("/racing-series", {
        name: 'Dummy Racing Series',
    })

    bru.setEnvVar('valid' + prefix + 'RacingSeriesId', response.id)

    return response.attributes
}
