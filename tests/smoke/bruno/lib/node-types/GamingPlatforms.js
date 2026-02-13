const {post} = require("../apiRequest.js")

exports.createFeaturesRacingGameRelationship = async function () {
    await post("/gaming-platforms/" + bru.getEnvVar('validGamingPlatformId') + "/features-racing-game/" + bru.getEnvVar('validRacingGameId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/gaming-platforms", {
        name: 'Dummy Gaming Platform',
    })
    const gamingPlatform = response.data
    bru.setEnvVar('valid' + prefix + 'GamingPlatformId', gamingPlatform.id)

    return gamingPlatform
}
