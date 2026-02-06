const {post} = require("../apiRequest.js")

exports.createImage = async function () {
    const response = await post("/images", {
        image_provider: "picci",
        external_id: "123456",
    })
    const image = response.data
    bru.setEnvVar('validImageId', image.id)

    return image
}
