const {post} = require("../apiRequest.js")

exports.createBrand = async function () {
    const response = await post("/brands", {
        name: 'Dummy'
    })
    const brand = response.data
    bru.setEnvVar('validBrandId', brand.id)

    return brand
}
