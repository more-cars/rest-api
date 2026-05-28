const {post} = require("../apiRequest.js")

exports.createIsVariantOfRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/relationships/is-variant-of", {
        data: {
            type: "is-variant-of",
            id: bru.getEnvVar('validCarModelId'),
        },
    })
}

exports.createAchievedSessionResultRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/relationships/achieved-session-result", {
        data: {
            type: "achieved-session-result",
            id: bru.getEnvVar('validSessionResultId'),
        },
    })
}

exports.createAchievedLapTimeRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/relationships/achieved-lap-time", {
        data: {
            type: "achieved-lap-time",
            id: bru.getEnvVar('validLapTimeId'),
        },
    })
}

exports.createIsPresentedInMagazineIssueRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/relationships/is-presented-in-magazine-issue", {
        data: {
            type: "is-presented-in-magazine-issue",
            id: bru.getEnvVar('validMagazineIssueId'),
        },
    })
}

exports.createReviewedByMagazineIssueWithRatingRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/relationships/reviewed-by-magazine-issue-with-rating", {
        data: {
            type: "reviewed-by-magazine-issue-with-rating",
            id: bru.getEnvVar('validRatingId'),
        },
    })
}

exports.createFeaturedInProgrammeEpisodeRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/relationships/featured-in-programme-episode", {
        data: {
            type: "featured-in-programme-episode",
            id: bru.getEnvVar('validProgrammeEpisodeId'),
        },
    })
}

exports.createIsFeaturedInRacingGameRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/relationships/is-featured-in-racing-game", {
        data: {
            type: "is-featured-in-racing-game",
            id: bru.getEnvVar('validRacingGameId'),
        },
    })
}

exports.createHasScaleModelRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/relationships/has-scale-model", {
        data: {
            type: "has-scale-model",
            id: bru.getEnvVar('validModelCarId'),
        },
    })
}

exports.createPresentedAtMotorShowRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/relationships/presented-at-motor-show", {
        data: {
            type: "presented-at-motor-show",
            id: bru.getEnvVar('validMotorShowId'),
        },
    })
}

exports.createHasPriceRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/relationships/has-price", {
        data: {
            type: "has-price",
            id: bru.getEnvVar('validPriceId'),
        },
    })
}

exports.createIsCoveredByBookRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/relationships/is-covered-by-book", {
        data: {
            type: "is-covered-by-book",
            id: bru.getEnvVar('validBookId'),
        },
    })
}

exports.createHasImageRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/relationships/has-image", {
        data: {
            type: "has-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/relationships/has-prime-image", {
        data: {
            type: "has-prime-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasVideoRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/relationships/has-video", {
        data: {
            type: "has-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.createHasMainVideoRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/relationships/has-main-video", {
        data: {
            type: "has-main-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.create = async function (prefix = '') {
    const response = await post("/car-model-variants", {
        name: 'Dummy Car Model Variant',
    })

    bru.setEnvVar('valid' + prefix + 'CarModelVariantId', response.id)

    return response.attributes
}