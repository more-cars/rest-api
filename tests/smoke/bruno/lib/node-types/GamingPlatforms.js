const {post} = require("../apiRequest.js")

exports.createHasPrimeImageRelationship = async function () {
    await post("/gaming-platforms/" + bru.getEnvVar('validGamingPlatformId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasImageRelationship = async function () {
    await post("/gaming-platforms/" + bru.getEnvVar('validGamingPlatformId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createFeaturesRacingGameRelationship = async function () {
    await post("/gaming-platforms/" + bru.getEnvVar('validGamingPlatformId') + "/features-racing-game/" + bru.getEnvVar('validRacingGameId'))
}

exports.createHasVideoRelationship = async function () {
    await post("/gaming-platforms/" + bru.getEnvVar('validGamingPlatformId') + "/has-video/" + bru.getEnvVar('validVideoId'))
}

exports.createHasMainVideoRelationship = async function () {
    await post("/gaming-platforms/" + bru.getEnvVar('validGamingPlatformId') + "/has-main-video/" + bru.getEnvVar('validVideoId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/gaming-platforms", {
        name: 'Dummy Gaming Platform',
    })

    bru.setEnvVar('valid' + prefix + 'GamingPlatformId', response.id)

    return response.attributes
}
