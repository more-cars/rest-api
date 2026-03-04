const {post} = require("../apiRequest.js")

exports.createBelongsToMagazineRelationship = async function () {
    await post("/magazine-issues/" + bru.getEnvVar('validMagazineIssueId') + "/belongs-to-magazine/" + bru.getEnvVar('validMagazineId'))
}

exports.createHasImageRelationship = async function () {
    await post("/magazine-issues/" + bru.getEnvVar('validMagazineIssueId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/magazine-issues/" + bru.getEnvVar('validMagazineIssueId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/magazine-issues", {
        title: 'Dummy Magazine Issue',
    })

    bru.setEnvVar('valid' + prefix + 'MagazineIssueId', response.id)

    return response.attributes
}
