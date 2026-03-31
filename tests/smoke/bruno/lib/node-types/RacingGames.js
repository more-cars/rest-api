const {post} = require("../apiRequest.js")

exports.createFeaturesCarModelVariantRelationship = async function () {
    await post("/racing-games/" + bru.getEnvVar('validRacingGameId') + "/features-car-model-variant/" + bru.getEnvVar('validCarModelVariantId'))
}

exports.createFeaturesTrackLayoutRelationship = async function () {
    await post("/racing-games/" + bru.getEnvVar('validRacingGameId') + "/features-track-layout/" + bru.getEnvVar('validTrackLayoutId'))
}

exports.createReleasedOnGamingPlatformRelationship = async function () {
    await post("/racing-games/" + bru.getEnvVar('validRacingGameId') + "/released-on-gaming-platform/" + bru.getEnvVar('validGamingPlatformId'))
}

exports.createHasImageRelationship = async function () {
    await post("/racing-games/" + bru.getEnvVar('validRacingGameId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/racing-games/" + bru.getEnvVar('validRacingGameId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasVideoRelationship = async function () {
    await post("/racing-games/" + bru.getEnvVar('validRacingGameId') + "/has-video/" + bru.getEnvVar('validVideoId'))
}

exports.createHasMainVideoRelationship = async function () {
    await post("/racing-games/" + bru.getEnvVar('validRacingGameId') + "/has-main-video/" + bru.getEnvVar('validVideoId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/racing-games", {
        name: 'Dummy Racing Game',
    })

    bru.setEnvVar('valid' + prefix + 'RacingGameId', response.id)

    return response.attributes
}
