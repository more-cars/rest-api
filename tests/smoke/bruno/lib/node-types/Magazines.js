const {post} = require("../apiRequest.js")

exports.createHasImageRelationship = async function () {
    await post("/magazines/" + bru.getEnvVar('validMagazineId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/magazines/" + bru.getEnvVar('validMagazineId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/magazines", {
        name: 'Dummy Magazine',
    })
    const magazine = response.data
    bru.setEnvVar('valid' + prefix + 'MagazineId', magazine.id)

    return magazine
}
