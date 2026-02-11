const {post} = require("../apiRequest.js")

exports.createFeaturesCarModelVariantRelationship = async function () {
    await post("/racing-games/" + bru.getEnvVar('validRacingGameId') + "/features-car-model-variant/" + bru.getEnvVar('validCarModelVariantId'))
}

exports.createFeaturesTrackLayoutRelationship = async function () {
    await post("/racing-games/" + bru.getEnvVar('validRacingGameId') + "/features-track-layout/" + bru.getEnvVar('validTrackLayoutId'))
}

exports.createHasImageRelationship = async function () {
    await post("/racing-games/" + bru.getEnvVar('validRacingGameId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/racing-games/" + bru.getEnvVar('validRacingGameId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/racing-games", {
        name: 'Dummy Racing Game',
    })
    const racingGame = response.data
    bru.setEnvVar('valid' + prefix + 'RacingGameId', racingGame.id)

    return racingGame
}
