const {del, post} = require("../apiRequest.js")

exports.createBelongsToNodeRelationship = async function () {
    await post("/videos/" + bru.getEnvVar('validVideoId') + "/relationships/belongs-to-node", {
        data: {
            type: "belongs-to-node",
            id: bru.getEnvVar('validNodeId'),
        },
    })
}

exports.createIsMainVideoOfNodeRelationship = async function () {
    await post("/videos/" + bru.getEnvVar('validVideoId') + "/relationships/is-main-video-of-node", {
        data: {
            type: "is-main-video-of-node",
            id: bru.getEnvVar('validNodeId'),
        },
    })
}

exports.create = async function (prefix = '') {
    const response = await post("/videos", {
        video_provider: "youtube",
        external_id: "zbZ9iYWReZA",
    })

    bru.setEnvVar('valid' + prefix + 'VideoId', response.id)

    return response.attributes
}

exports.delete = async function (id) {
    const response = await del("/videos/" + id)

    return response.attributes
}
