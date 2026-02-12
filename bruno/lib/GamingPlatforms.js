const {submitPostRequest, submitGetRequest} = require("./request")

exports.ensureValidGamingPlatformExists = async function () {
    if (!bru.getEnvVar('validGamingPlatformId')) {
        const nodeList = await this.getAllGamingPlatforms()
        if (nodeList.length > 0) {
            bru.setEnvVar("validGamingPlatformId", nodeList[0].data.id)
        } else {
            const newNode = await this.createGamingPlatform()
            bru.setEnvVar("validGamingPlatformId", newNode.data.id)
        } //
    }
}

exports.createGamingPlatform = async function () {
    return submitPostRequest("/gaming-platforms", {
        name: 'PlayStation 5',
    })
}

exports.getAllGamingPlatforms = async function () {
    return submitGetRequest("/gaming-platforms")
}