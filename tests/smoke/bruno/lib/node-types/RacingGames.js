const {post} = require("../apiRequest.js")

exports.createFeaturesCarModelVariantRelationship = async function () {
    await post("/racing-games/" + bru.getEnvVar('validRacingGameId') + "/relationships/features-car-model-variant", {
        data: {
            type: "features-car-model-variant",
            id: bru.getEnvVar('validCarModelVariantId'),
        },
    })
}

exports.createFeaturesTrackLayoutRelationship = async function () {
    await post("/racing-games/" + bru.getEnvVar('validRacingGameId') + "/relationships/features-track-layout", {
        data: {
            type: "features-track-layout",
            id: bru.getEnvVar('validTrackLayoutId'),
        },
    })
}

exports.createReleasedOnGamingPlatformRelationship = async function () {
    await post("/racing-games/" + bru.getEnvVar('validRacingGameId') + "/relationships/released-on-gaming-platform", {
        data: {
            type: "released-on-gaming-platform",
            id: bru.getEnvVar('validGamingPlatformId'),
        },
    })
}

exports.createHasImageRelationship = async function () {
    await post("/racing-games/" + bru.getEnvVar('validRacingGameId') + "/relationships/has-image", {
        data: {
            type: "has-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/racing-games/" + bru.getEnvVar('validRacingGameId') + "/relationships/has-prime-image", {
        data: {
            type: "has-prime-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasVideoRelationship = async function () {
    await post("/racing-games/" + bru.getEnvVar('validRacingGameId') + "/relationships/has-video", {
        data: {
            type: "has-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.createHasMainVideoRelationship = async function () {
    await post("/racing-games/" + bru.getEnvVar('validRacingGameId') + "/relationships/has-main-video", {
        data: {
            type: "has-main-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.create = async function (prefix = '') {
    const response = await post("/racing-games", {
        name: 'Dummy Racing Game',
    })

    bru.setEnvVar('valid' + prefix + 'RacingGameId', response.id)

    return response.attributes
}
