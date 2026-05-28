const {post} = require("../apiRequest")

exports.createBelongsToRacingSeriesRelationship = async function () {
    await post("/racing-events/" + bru.getEnvVar('validRacingEventId') + "/relationships/belongs-to-racing-series", {
        data: {
            type: "belongs-to-racing-series",
            id: bru.getEnvVar('validRacingSeriesId'),
        },
    })
}

exports.createFollowsEventRelationship = async function () {
    await post("/racing-events/" + bru.getEnvVar('validRacingEventId') + "/relationships/follows-event", {
        data: {
            type: "follows-event",
            id: bru.getEnvVar('validSecondRacingEventId'),
        },
    })
}

exports.createIsFollowedByEventRelationship = async function () {
    await post("/racing-events/" + bru.getEnvVar('validRacingEventId') + "/relationships/is-followed-by-event", {
        data: {
            type: "is-followed-by-event",
            id: bru.getEnvVar('validSecondRacingEventId'),
        },
    })
}

exports.createTookPlaceAtRaceTrackRelationship = async function () {
    await post("/racing-events/" + bru.getEnvVar('validRacingEventId') + "/relationships/took-place-at-race-track", {
        data: {
            type: "took-place-at-race-track",
            id: bru.getEnvVar('validRaceTrackId'),
        },
    })
}

exports.createUsedTheTrackLayoutRelationship = async function () {
    await post("/racing-events/" + bru.getEnvVar('validRacingEventId') + "/relationships/used-the-track-layout", {
        data: {
            type: "used-the-track-layout",
            id: bru.getEnvVar('validTrackLayoutId'),
        },
    })
}

exports.createHasRacingSessionRelationship = async function () {
    await post("/racing-events/" + bru.getEnvVar('validRacingEventId') + "/relationships/has-racing-session", {
        data: {
            type: "has-racing-session",
            id: bru.getEnvVar('validRacingSessionId'),
        },
    })
}

exports.createCoveredByMagazineIssueRelationship = async function () {
    await post("/racing-events/" + bru.getEnvVar('validRacingEventId') + "/relationships/covered-by-magazine-issue", {
        data: {
            type: "covered-by-magazine-issue",
            id: bru.getEnvVar('validMagazineIssueId'),
        },
    })
}

exports.createHasImageRelationship = async function () {
    await post("/racing-events/" + bru.getEnvVar('validRacingEventId') + "/relationships/has-image", {
        data: {
            type: "has-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/racing-events/" + bru.getEnvVar('validRacingEventId') + "/relationships/has-prime-image", {
        data: {
            type: "has-prime-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasVideoRelationship = async function () {
    await post("/racing-events/" + bru.getEnvVar('validRacingEventId') + "/relationships/has-video", {
        data: {
            type: "has-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.createHasMainVideoRelationship = async function () {
    await post("/racing-events/" + bru.getEnvVar('validRacingEventId') + "/relationships/has-main-video", {
        data: {
            type: "has-main-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.create = async function (prefix = '') {
    const response = await post("/racing-events", {
        name: 'Dummy Racing Event',
    })

    bru.setEnvVar('valid' + prefix + 'RacingEventId', response.id)

    return response.attributes
}
