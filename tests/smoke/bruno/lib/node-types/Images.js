const {del, post} = require("../apiRequest.js")

exports.createIsPrimeImageOfNodeRelationship = async function () {
    await post("/images/" + bru.getEnvVar('validImageId') + "/relationships/is-prime-image-of-node", {
        data: {
            type: "is-prime-image-of-node",
            id: bru.getEnvVar('validNodeId'),
        },
    })
}

exports.createBelongsToNodeRelationship = async function () {
    await post("/images/" + bru.getEnvVar('validImageId') + "/relationships/belongs-to-node", {
        data: {
            type: "belongs-to-node",
            id: bru.getEnvVar('validNodeId'),
        },
    })
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
