const {post} = require("../apiRequest.js")

exports.createHasPrimeImageRelationship = async function () {
    await post("/gaming-platforms/" + bru.getEnvVar('validGamingPlatformId') + "/relationships/has-prime-image", {
        data: {
            type: "has-prime-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasImageRelationship = async function () {
    await post("/gaming-platforms/" + bru.getEnvVar('validGamingPlatformId') + "/relationships/has-image", {
        data: {
            type: "has-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createFeaturesRacingGameRelationship = async function () {
    await post("/gaming-platforms/" + bru.getEnvVar('validGamingPlatformId') + "/relationships/features-racing-game", {
        data: {
            type: "features-racing-game",
            id: bru.getEnvVar('validRacingGameId'),
        },
    })
}

exports.createHasVideoRelationship = async function () {
    await post("/gaming-platforms/" + bru.getEnvVar('validGamingPlatformId') + "/relationships/has-video", {
        data: {
            type: "has-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.createHasMainVideoRelationship = async function () {
    await post("/gaming-platforms/" + bru.getEnvVar('validGamingPlatformId') + "/relationships/has-main-video", {
        data: {
            type: "has-main-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.create = async function (prefix = '') {
    const response = await post("/gaming-platforms", {
        name: 'Dummy Gaming Platform',
    })

    bru.setEnvVar('valid' + prefix + 'GamingPlatformId', response.id)

    return response.attributes
}
