const {post} = require("../apiRequest.js")

exports.createBelongsToRacingEventRelationship = async function () {
    await post("/racing-sessions/" + bru.getEnvVar('validRacingSessionId') + "/relationships/belongs-to-racing-event", {
        data: {
            type: "belongs-to-racing-event",
            id: bru.getEnvVar('validRacingEventId'),
        },
    })
}

exports.createHasSessionResultRelationship = async function () {
    await post("/racing-sessions/" + bru.getEnvVar('validRacingSessionId') + "/relationships/has-session-result", {
        data: {
            type: "has-session-result",
            id: bru.getEnvVar('validSessionResultId'),
        },
    })
}

exports.createHasImageRelationship = async function () {
    await post("/racing-sessions/" + bru.getEnvVar('validRacingSessionId') + "/relationships/has-image", {
        data: {
            type: "has-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/racing-sessions/" + bru.getEnvVar('validRacingSessionId') + "/relationships/has-prime-image", {
        data: {
            type: "has-prime-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasVideoRelationship = async function () {
    await post("/racing-sessions/" + bru.getEnvVar('validRacingSessionId') + "/relationships/has-video", {
        data: {
            type: "has-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.createHasMainVideoRelationship = async function () {
    await post("/racing-sessions/" + bru.getEnvVar('validRacingSessionId') + "/relationships/has-main-video", {
        data: {
            type: "has-main-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.create = async function (prefix = '') {
    const response = await post("/racing-sessions", {
        name: 'Dummy Racing Session',
    })

    bru.setEnvVar('valid' + prefix + 'RacingSessionId', response.id)

    return response.attributes
}
