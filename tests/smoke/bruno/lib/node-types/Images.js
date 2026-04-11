const {del, post} = require("../apiRequest.js")

exports.createIsPrimeImageOfNodeRelationship = async function () {
    await post("/images/" + bru.getEnvVar('validImageId') + "/is-prime-image-of-node/" + bru.getEnvVar('validNodeId'))
}

exports.createBelongsToNodeRelationship = async function () {
    await post("/images/" + bru.getEnvVar('validImageId') + "/belongs-to-node/" + bru.getEnvVar('validNodeId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/images", {
        image_provider: "wikimedia",
        external_id: "2011-03-04 Autosalon Genf 1391.JPG"
    })

    bru.setEnvVar('valid' + prefix + 'ImageId', response.id)

    return response.attributes
}

exports.delete = async function (id) {
    const response = await del("/images/" + id)

    return response.attributes
}
