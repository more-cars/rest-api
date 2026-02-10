const {submitPostRequest, submitGetRequest} = require("./request")

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
