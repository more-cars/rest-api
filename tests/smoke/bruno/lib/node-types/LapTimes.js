const {post} = require("../apiRequest.js")

exports.createBelongsToSessionResultRelationship = async function () {
    await post("/lap-times/" + bru.getEnvVar('validLapTimeId') + "/relationships/belongs-to-session-result", {
        data: {
            type: "belongs-to-session-result",
            id: bru.getEnvVar('validSessionResultId'),
        },
    })
}

exports.createAchievedWithCarModelVariantRelationship = async function () {
    await post("/lap-times/" + bru.getEnvVar('validLapTimeId') + "/relationships/achieved-with-car-model-variant", {
        data: {
            type: "achieved-with-car-model-variant",
            id: bru.getEnvVar('validCarModelVariantId'),
        },
    })
}

exports.createAchievedOnTrackLayoutRelationship = async function () {
    await post("/lap-times/" + bru.getEnvVar('validLapTimeId') + "/relationships/achieved-on-track-layout", {
        data: {
            type: "achieved-on-track-layout",
            id: bru.getEnvVar('validTrackLayoutId'),
        },
    })
}

exports.createDocumentedInMagazineIssueRelationship = async function () {
    await post("/lap-times/" + bru.getEnvVar('validLapTimeId') + "/relationships/documented-in-magazine-issue", {
        data: {
            type: "documented-in-magazine-issue",
            id: bru.getEnvVar('validMagazineIssueId'),
        },
    })
}

exports.createHasImageRelationship = async function () {
    await post("/lap-times/" + bru.getEnvVar('validLapTimeId') + "/relationships/has-image", {
        data: {
            type: "has-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/lap-times/" + bru.getEnvVar('validLapTimeId') + "/relationships/has-prime-image", {
        data: {
            type: "has-prime-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasVideoRelationship = async function () {
    await post("/lap-times/" + bru.getEnvVar('validLapTimeId') + "/relationships/has-video", {
        data: {
            type: "has-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.createHasMainVideoRelationship = async function () {
    await post("/lap-times/" + bru.getEnvVar('validLapTimeId') + "/relationships/has-main-video", {
        data: {
            type: "has-main-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.create = async function (prefix = '') {
    const response = await post("/lap-times", {
        time: 'PT1M33.294S',
        driver_name: 'Dummy Driver',
    })

    bru.setEnvVar('valid' + prefix + 'LapTimeId', response.id)

    return response.attributes
}
