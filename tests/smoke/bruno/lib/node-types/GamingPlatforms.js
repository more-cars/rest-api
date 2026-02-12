const {post} = require("../apiRequest.js")

exports.create = async function (prefix = '') {
    const response = await post("/gaming-platforms", {
        name: 'Dummy Gaming Platform',
    })
    const gamingPlatform = response.data
    bru.setEnvVar('valid' + prefix + 'GamingPlatformId', gamingPlatform.id)

    return gamingPlatform
}
