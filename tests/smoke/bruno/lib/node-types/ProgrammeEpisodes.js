const {post} = require("../apiRequest.js")

exports.createBelongsToProgrammeRelationship = async function () {
    await post("/programme-episodes/" + bru.getEnvVar('validProgrammeEpisodeId') + "/relationships/belongs-to-programme", {
        data: {
            type: "belongs-to-programme",
            id: bru.getEnvVar('validProgrammeId'),
        },
    })
}

exports.createFollowsEpisodeRelationship = async function () {
    await post("/programme-episodes/" + bru.getEnvVar('validProgrammeEpisodeId') + "/relationships/follows-episode", {
        data: {
            type: "follows-episode",
            id: bru.getEnvVar('validSecondProgrammeEpisodeId'),
        },
    })
}

exports.createIsFollowedByEpisodeRelationship = async function () {
    await post("/programme-episodes/" + bru.getEnvVar('validProgrammeEpisodeId') + "/relationships/is-followed-by-episode", {
        data: {
            type: "is-followed-by-episode",
            id: bru.getEnvVar('validSecondProgrammeEpisodeId'),
        },
    })
}

exports.createCoversCarModelRelationship = async function () {
    await post("/programme-episodes/" + bru.getEnvVar('validProgrammeEpisodeId') + "/relationships/covers-car-model", {
        data: {
            type: "covers-car-model",
            id: bru.getEnvVar('validCarModelId'),
        },
    })
}

exports.createFeaturesCarModelVariantRelationship = async function () {
    await post("/programme-episodes/" + bru.getEnvVar('validProgrammeEpisodeId') + "/relationships/features-car-model-variant", {
        data: {
            type: "features-car-model-variant",
            id: bru.getEnvVar('validCarModelVariantId'),
        },
    })
}

exports.createHasImageRelationship = async function () {
    await post("/programme-episodes/" + bru.getEnvVar('validProgrammeEpisodeId') + "/relationships/has-image", {
        data: {
            type: "has-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/programme-episodes/" + bru.getEnvVar('validProgrammeEpisodeId') + "/relationships/has-prime-image", {
        data: {
            type: "has-prime-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasVideoRelationship = async function () {
    await post("/programme-episodes/" + bru.getEnvVar('validProgrammeEpisodeId') + "/relationships/has-video", {
        data: {
            type: "has-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.createHasMainVideoRelationship = async function () {
    await post("/programme-episodes/" + bru.getEnvVar('validProgrammeEpisodeId') + "/relationships/has-main-video", {
        data: {
            type: "has-main-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.create = async function (prefix = '') {
    const response = await post("/programme-episodes", {
        title: 'Dummy Programme Episode',
    })

    bru.setEnvVar('valid' + prefix + 'ProgrammeEpisodeId', response.id)

    return response.attributes
}
