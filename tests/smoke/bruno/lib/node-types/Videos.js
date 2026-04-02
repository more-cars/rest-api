const {del, post} = require("../apiRequest.js")

exports.createBelongsToNodeRelationship = async function () {
    await post("/videos/" + bru.getEnvVar('validVideoId') + "/belongs-to-node/" + bru.getEnvVar('validNodeId'))
}

exports.createIsMainVideoOfNodeRelationship = async function () {
    await post("/videos/" + bru.getEnvVar('validVideoId') + "/is-main-video-of-node/" + bru.getEnvVar('validNodeId'))
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
