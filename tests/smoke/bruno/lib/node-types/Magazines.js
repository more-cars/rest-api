const {post} = require("../apiRequest.js")

exports.create = async function (prefix = '') {
    const response = await post("/magazines", {
        name: 'Dummy Magazine',
    })
    const magazine = response.data
    bru.setEnvVar('valid' + prefix + 'MagazineId', magazine.id)

    return magazine
}
