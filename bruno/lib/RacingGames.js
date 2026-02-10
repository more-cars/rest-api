const {submitPostRequest, submitGetRequest} = require("./request")
const {ensureValidCarModelVariantExists} = require("./CarModelVariants")

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
