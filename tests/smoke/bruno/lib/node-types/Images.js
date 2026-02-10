const {post} = require("../apiRequest.js")

exports.create = async function (prefix = '') {
    const response = await post("/images", {
        image_provider: "picci",
        external_id: "123456",
    })
    const image = response.data
    bru.setEnvVar('valid' + prefix + 'ImageId', image.id)

    return image
}
