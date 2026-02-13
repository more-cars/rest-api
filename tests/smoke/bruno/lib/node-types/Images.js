const {post} = require("../apiRequest.js")

exports.createIsPrimeImageOfNodeRelationship = async function () {
    await post("/images/" + bru.getEnvVar('validImageId') + "/is-prime-image-of-node/" + bru.getEnvVar('validNodeId'))
}

exports.createBelongsToNodeRelationship = async function () {
    await post("/images/" + bru.getEnvVar('validImageId') + "/belongs-to-node/" + bru.getEnvVar('validNodeId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/images", {
        image_provider: "picci",
        external_id: "123456",
    })
    const image = response.data
    bru.setEnvVar('valid' + prefix + 'ImageId', image.id)

    return image
}
