const {post} = require("../apiRequest.js")

exports.create = async function (prefix = '') {
    const response = await post("/programme-episodes", {
        name: 'Dummy Programme Episode',
    })

    bru.setEnvVar('valid' + prefix + 'ProgrammeEpisodeId', response.id)

    return response.attributes
}
