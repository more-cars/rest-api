const {post} = require("../apiRequest.js")

exports.createBelongsToMagazineRelationship = async function () {
    await post("/magazine-issues/" + bru.getEnvVar('validMagazineIssueId') + "/relationships/belongs-to-magazine", {
        data: {
            type: "belongs-to-magazine",
            id: bru.getEnvVar('validMagazineId'),
        },
    })
}

exports.createFollowsIssueRelationship = async function () {
    await post("/magazine-issues/" + bru.getEnvVar('validMagazineIssueId') + "/relationships/follows-issue", {
        data: {
            type: "follows-issue",
            id: bru.getEnvVar('validSecondMagazineIssueId'),
        },
    })
}

exports.createFollowedByIssueRelationship = async function () {
    await post("/magazine-issues/" + bru.getEnvVar('validMagazineIssueId') + "/relationships/followed-by-issue", {
        data: {
            type: "followed-by-issue",
            id: bru.getEnvVar('validSecondMagazineIssueId'),
        },
    })
}

exports.createCoversCarModelRelationship = async function () {
    await post("/magazine-issues/" + bru.getEnvVar('validMagazineIssueId') + "/relationships/covers-car-model", {
        data: {
            type: "covers-car-model",
            id: bru.getEnvVar('validCarModelId'),
        },
    })
}

exports.createPresentsCarModelVariantRelationship = async function () {
    await post("/magazine-issues/" + bru.getEnvVar('validMagazineIssueId') + "/relationships/presents-car-model-variant", {
        data: {
            type: "presents-car-model-variant",
            id: bru.getEnvVar('validCarModelVariantId'),
        },
    })
}

exports.createReviewedCarModelVariantWithRatingRelationship = async function () {
    await post("/magazine-issues/" + bru.getEnvVar('validMagazineIssueId') + "/relationships/reviewed-car-model-variant-with-rating", {
        data: {
            type: "reviewed-car-model-variant-with-rating",
            id: bru.getEnvVar('validRatingId'),
        },
    })
}

exports.createCoversRacingEventRelationship = async function () {
    await post("/magazine-issues/" + bru.getEnvVar('validMagazineIssueId') + "/relationships/covers-racing-event", {
        data: {
            type: "covers-racing-event",
            id: bru.getEnvVar('validRacingEventId'),
        },
    })
}

exports.createDocumentsLapTimeRelationship = async function () {
    await post("/magazine-issues/" + bru.getEnvVar('validMagazineIssueId') + "/relationships/documents-lap-time", {
        data: {
            type: "documents-lap-time",
            id: bru.getEnvVar('validLapTimeId'),
        },
    })
}

exports.createHasImageRelationship = async function () {
    await post("/magazine-issues/" + bru.getEnvVar('validMagazineIssueId') + "/relationships/has-image", {
        data: {
            type: "has-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/magazine-issues/" + bru.getEnvVar('validMagazineIssueId') + "/relationships/has-prime-image", {
        data: {
            type: "has-prime-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasVideoRelationship = async function () {
    await post("/magazine-issues/" + bru.getEnvVar('validMagazineIssueId') + "/relationships/has-video", {
        data: {
            type: "has-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.createHasMainVideoRelationship = async function () {
    await post("/magazine-issues/" + bru.getEnvVar('validMagazineIssueId') + "/relationships/has-main-video", {
        data: {
            type: "has-main-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.create = async function (prefix = '') {
    const response = await post("/magazine-issues", {
        title: 'Dummy Magazine Issue',
    })

    bru.setEnvVar('valid' + prefix + 'MagazineIssueId', response.id)

    return response.attributes
}
