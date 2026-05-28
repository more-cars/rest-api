const {post} = require("../apiRequest.js")

exports.createBelongsToRaceTrackRelationship = async function () {
    await post("/track-layouts/" + bru.getEnvVar('validTrackLayoutId') + "/relationships/belongs-to-race-track", {
        data: {
            type: "belongs-to-race-track",
            id: bru.getEnvVar('validRaceTrackId'),
        },
    })
}

exports.createWasUsedByRacingEventRelationship = async function () {
    await post("/track-layouts/" + bru.getEnvVar('validTrackLayoutId') + "/relationships/was-used-by-racing-event", {
        data: {
            type: "was-used-by-racing-event",
            id: bru.getEnvVar('validRacingEventId'),
        },
    })
}

exports.createHasLapTimeRelationship = async function () {
    await post("/track-layouts/" + bru.getEnvVar('validTrackLayoutId') + "/relationships/has-lap-time", {
        data: {
            type: "has-lap-time",
            id: bru.getEnvVar('validLapTimeId'),
        },
    })
}

exports.createIsFeaturedInRacingGameRelationship = async function () {
    await post("/track-layouts/" + bru.getEnvVar('validTrackLayoutId') + "/relationships/is-featured-in-racing-game", {
        data: {
            type: "is-featured-in-racing-game",
            id: bru.getEnvVar('validRacingGameId'),
        },
    })
}

exports.createHasImageRelationship = async function () {
    await post("/track-layouts/" + bru.getEnvVar('validTrackLayoutId') + "/relationships/has-image", {
        data: {
            type: "has-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/track-layouts/" + bru.getEnvVar('validTrackLayoutId') + "/relationships/has-prime-image", {
        data: {
            type: "has-prime-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasVideoRelationship = async function () {
    await post("/track-layouts/" + bru.getEnvVar('validTrackLayoutId') + "/relationships/has-video", {
        data: {
            type: "has-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.createHasMainVideoRelationship = async function () {
    await post("/track-layouts/" + bru.getEnvVar('validTrackLayoutId') + "/relationships/has-main-video", {
        data: {
            type: "has-main-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.create = async function (prefix = '') {
    const response = await post("/track-layouts", {
        name: 'Dummy Track Layout',
    })

    bru.setEnvVar('valid' + prefix + 'TrackLayoutId', response.id)

    return response.attributes
}
