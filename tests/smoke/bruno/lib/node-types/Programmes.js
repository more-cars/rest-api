const {post} = require("../apiRequest.js")

exports.createHasEpisodeRelationship = async function () {
    await post("/programmes/" + bru.getEnvVar('validProgrammeId') + "/has-episode/" + bru.getEnvVar('validProgrammeEpisodeId'))
}

exports.createHasImageRelationship = async function () {
    await post("/programmes/" + bru.getEnvVar('validProgrammeId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/programmes/" + bru.getEnvVar('validProgrammeId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasVideoRelationship = async function () {
    await post("/programmes/" + bru.getEnvVar('validProgrammeId') + "/has-video/" + bru.getEnvVar('validVideoId'))
}

exports.createHasMainVideoRelationship = async function () {
    await post("/programmes/" + bru.getEnvVar('validProgrammeId') + "/has-main-video/" + bru.getEnvVar('validVideoId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/programmes", {
        name: 'Dummy Programme',
    })

    bru.setEnvVar('valid' + prefix + 'ProgrammeId', response.id)

    return response.attributes
}
