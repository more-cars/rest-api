const {post} = require("../apiRequest.js")

exports.create = async function (prefix = '') {
    const response = await post("/racing-games", {
        name: 'Dummy Racing Game',
    })
    const racingGame = response.data
    bru.setEnvVar('valid' + prefix + 'RacingGameId', racingGame.id)

    return racingGame
}
