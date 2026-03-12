const {post} = require("../apiRequest.js")

exports.createHasEpisodeRelationship = async function () {
    await post("/programmes/" + bru.getEnvVar('validProgrammeId') + "/has-episode/" + bru.getEnvVar('validProgrammeEpisodeId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/programmes", {
        name: 'Dummy Programme',
    })

    bru.setEnvVar('valid' + prefix + 'ProgrammeId', response.id)

    return response.attributes
}
