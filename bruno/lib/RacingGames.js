const {submitPostRequest} = require("./request")

exports.ensureValidRacingGameExists = async function () {
    if (!bru.getEnvVar('validRacingGameId')) {
        const newNode = await this.createRacingGame()
        bru.setEnvVar("validRacingGameId", newNode.data.id)
    }
}

exports.createRacingGame = async function () {
    return submitPostRequest("/racing-games", {
        name: 'Forza Motorsport 7',
    })
}
