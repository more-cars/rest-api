const {post} = require("../apiRequest.js")

exports.createBelongsToProgrammeRelationship = async function () {
    await post("/programme-episodes/" + bru.getEnvVar('validProgrammeEpisodeId') + "/belongs-to-programme/" + bru.getEnvVar('validProgrammeId'))
}

exports.createFollowsEpisodeRelationship = async function () {
    await post("/programme-episodes/" + bru.getEnvVar('validProgrammeEpisodeId') + "/follows-episode/" + bru.getEnvVar('validSecondProgrammeEpisodeId'))
}

exports.createIsFollowedByEpisodeRelationship = async function () {
    await post("/programme-episodes/" + bru.getEnvVar('validProgrammeEpisodeId') + "/is-followed-by-episode/" + bru.getEnvVar('validSecondProgrammeEpisodeId'))
}

exports.createCoversCarModelRelationship = async function () {
    await post("/programme-episodes/" + bru.getEnvVar('validProgrammeEpisodeId') + "/covers-car-model/" + bru.getEnvVar('validCarModelId'))
}

exports.createFeaturesCarModelVariantRelationship = async function () {
    await post("/programme-episodes/" + bru.getEnvVar('validProgrammeEpisodeId') + "/features-car-model-variant/" + bru.getEnvVar('validCarModelVariantId'))
}

exports.createHasImageRelationship = async function () {
    await post("/programme-episodes/" + bru.getEnvVar('validProgrammeEpisodeId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/programme-episodes/" + bru.getEnvVar('validProgrammeEpisodeId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasVideoRelationship = async function () {
    await post("/programme-episodes/" + bru.getEnvVar('validProgrammeEpisodeId') + "/has-video/" + bru.getEnvVar('validVideoId'))
}

exports.createHasMainVideoRelationship = async function () {
    await post("/programme-episodes/" + bru.getEnvVar('validProgrammeEpisodeId') + "/has-main-video/" + bru.getEnvVar('validVideoId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/programme-episodes", {
        title: 'Dummy Programme Episode',
    })

    bru.setEnvVar('valid' + prefix + 'ProgrammeEpisodeId', response.id)

    return response.attributes
}
