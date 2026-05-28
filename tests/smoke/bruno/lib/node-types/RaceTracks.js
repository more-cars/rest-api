const {post} = require("../apiRequest.js")

exports.createHasLayoutRelationship = async function () {
    await post("/race-tracks/" + bru.getEnvVar('validRaceTrackId') + "/relationships/has-layout", {
        data: {
            type: "has-layout",
            id: bru.getEnvVar('validTrackLayoutId'),
        },
    })
}

exports.createHostedRacingEventRelationship = async function () {
    await post("/race-tracks/" + bru.getEnvVar('validRaceTrackId') + "/relationships/hosted-racing-event", {
        data: {
            type: "hosted-racing-event",
            id: bru.getEnvVar('validRacingEventId'),
        },
    })
}

exports.createHasImageRelationship = async function () {
    await post("/race-tracks/" + bru.getEnvVar('validRaceTrackId') + "/relationships/has-image", {
        data: {
            type: "has-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/race-tracks/" + bru.getEnvVar('validRaceTrackId') + "/relationships/has-prime-image", {
        data: {
            type: "has-prime-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasVideoRelationship = async function () {
    await post("/race-tracks/" + bru.getEnvVar('validRaceTrackId') + "/relationships/has-video", {
        data: {
            type: "has-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.createHasMainVideoRelationship = async function () {
    await post("/race-tracks/" + bru.getEnvVar('validRaceTrackId') + "/relationships/has-main-video", {
        data: {
            type: "has-main-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.create = async function (prefix = '') {
    const response = await post("/race-tracks", {
        name: 'Dummy Race Track',
    })

    bru.setEnvVar('valid' + prefix + 'RaceTrackId', response.id)

    return response.attributes
}
