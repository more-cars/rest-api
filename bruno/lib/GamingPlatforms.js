const {submitPostRequest, submitGetRequest} = require("./request")

exports.ensureValidGamingPlatformExists = async function () {
    if (!bru.getEnvVar('validGamingPlatformId')) {
        const newNode = await this.createGamingPlatform()
        bru.setEnvVar("validGamingPlatformId", newNode.data.id)
    }
}

exports.createGamingPlatform = async function () {
    return submitPostRequest("/gaming-platforms", {
        name: 'PlayStation 5',
    })
}
