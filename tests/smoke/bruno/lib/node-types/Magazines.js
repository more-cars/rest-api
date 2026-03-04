const {post} = require("../apiRequest.js")

exports.createHasIssueRelationship = async function () {
    await post("/magazines/" + bru.getEnvVar('validMagazineId') + "/has-issue/" + bru.getEnvVar('validMagazineIssueId'))
}

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

    bru.setEnvVar('valid' + prefix + 'MagazineId', response.id)

    return response.attributes
}
