const {submitPostRequest, submitGetRequest} = require("./request")

exports.ensureValidImageExists = async function () {
    if (!bru.getEnvVar('validImageId')) {
        const nodeList = await this.getAllImages()
        if (nodeList.length > 0) {
            bru.setEnvVar("validImageId", nodeList[0].data.id)
        } else {
            const newNode = await this.createImage()
            bru.setEnvVar("validImageId", newNode.data.id)
        }
    }
}

exports.ensureValidSecondImageExists = async function () {
    const nodeList = await this.getAllImages()
    if (nodeList.length > 1) {
        bru.setEnvVar("validSecondImageId", nodeList[nodeList.length - 1].data.id)
    } else {
        const newNode = await this.createImage()
        bru.setEnvVar("validSecondImageId", newNode.data.id)
    }
}

exports.createImage = async function () {
    return submitPostRequest("/images", {
        "image_provider": "picci",
        "external_id": "123456",
    })
}

exports.getAllImages = async function () {
    return submitGetRequest("/images")
}

exports.ensureImageBelongsToNodeRelationshipExists = async function (imageId, nodeId) {
    return submitPostRequest("/images/" + imageId + "/belongs-to-node/" + nodeId)
}

exports.ensureImageIsPrimeImageOfNodeRelationshipExists = async function (imageId, nodeId) {
    return submitPostRequest("/images/" + imageId + "/is-prime-image-of-node/" + nodeId)
}
