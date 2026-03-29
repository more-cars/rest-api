const {post} = require("../apiRequest.js")

exports.create = async function (prefix = '') {
    const response = await post("/videos", {
        video_provider: "youtubbi",
        external_id: "123456",
    })

    bru.setEnvVar('valid' + prefix + 'VideoId', response.id)

    return response.attributes
}
