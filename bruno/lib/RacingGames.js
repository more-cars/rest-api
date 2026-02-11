const {submitPostRequest, submitGetRequest} = require("./request")
const {ensureValidCarModelVariantExists} = require("./CarModelVariants")
const {ensureValidTrackLayoutExists} = require("./TrackLayouts")
const {ensureValidImageExists} = require("./Images")

exports.ensureValidRacingGameExists = async function () {
    if (!bru.getEnvVar('validRacingGameId')) {
        const nodeList = await this.getAllRacingGames()
        if (nodeList.length > 0) {
            bru.setEnvVar("validRacingGameId", nodeList[0].data.id)
        } else {
            const newNode = await this.createRacingGame()
            bru.setEnvVar("validRacingGameId", newNode.data.id)
        } //
    }
}

exports.createRacingGame = async function () {
    return submitPostRequest("/racing-games", {
        name: 'Forza Motorsport 7',
    })
}

exports.getAllRacingGames = async function () {
    return submitGetRequest("/racing-games")
}

exports.ensureRacingGameFeaturesCarModelVariantRelationshipExists = async function () {
    await this.ensureValidRacingGameExists()
    await ensureValidCarModelVariantExists()
    await this.createRacingGameFeaturesCarModelVariantRelationship(bru.getEnvVar('validRacingGameId'), bru.getEnvVar('validCarModelVariantId'))
}

exports.createRacingGameFeaturesCarModelVariantRelationship = async function (racingGameId, carModelVariantId) {
    return submitPostRequest("/racing-games/" + racingGameId + "/features-car-model-variant/" + carModelVariantId)
}

exports.ensureRacingGameFeaturesTrackLayoutRelationshipExists = async function () {
    await this.ensureValidRacingGameExists()
    await ensureValidTrackLayoutExists()
    await this.createRacingGameFeaturesTrackLayoutRelationship(bru.getEnvVar('validRacingGameId'), bru.getEnvVar('validTrackLayoutId'))
}

exports.createRacingGameFeaturesTrackLayoutRelationship = async function (racingGameId, trackLayoutId) {
    return submitPostRequest("/racing-games/" + racingGameId + "/features-track-layout/" + trackLayoutId)
}

exports.ensureRacingGameHasImageRelationshipExists = async function () {
    await this.ensureValidRacingGameExists()
    await ensureValidImageExists()
    await this.createRacingGameHasImageRelationship(bru.getEnvVar('validRacingGameId'), bru.getEnvVar('validImageId'))
}

exports.createRacingGameHasImageRelationship = async function (racingGameId, imageId) {
    return submitPostRequest("/racing-games/" + racingGameId + "/has-image/" + imageId)
}

exports.ensureRacingGameHasPrimeImageRelationshipExists = async function () {
    await this.ensureValidRacingGameExists()
    await ensureValidImageExists()
    await this.createRacingGameHasPrimeImageRelationship(bru.getEnvVar('validRacingGameId'), bru.getEnvVar('validImageId'))
}

exports.createRacingGameHasPrimeImageRelationship = async function (racingGameId, imageId) {
    return submitPostRequest("/racing-games/" + racingGameId + "/has-prime-image/" + imageId)
}
