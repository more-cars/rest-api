const {post} = require("../apiRequest.js")

exports.createBelongsToBrandRelationship = async function () {
    await post("/car-models/" + bru.getEnvVar('validCarModelId') + "/belongs-to-brand/" + bru.getEnvVar('validBrandId'))
}

exports.createHasSuccessorRelationship = async function () {
    await post("/car-models/" + bru.getEnvVar('validCarModelId') + "/has-successor/" + bru.getEnvVar('validSecondCarModelId'))
}

exports.createIsSuccessorOfRelationship = async function () {
    await post("/car-models/" + bru.getEnvVar('validCarModelId') + "/is-successor-of/" + bru.getEnvVar('validSecondCarModelId'))
}

exports.createHasVariantRelationship = async function () {
    await post("/car-models/" + bru.getEnvVar('validCarModelId') + "/has-variant/" + bru.getEnvVar('validCarModelVariantId'))
}

exports.createCoveredByMagazineIssueRelationship = async function () {
    await post("/car-models/" + bru.getEnvVar('validCarModelId') + "/covered-by-magazine-issue/" + bru.getEnvVar('validMagazineIssueId'))
}

exports.createCoveredByProgrammeEpisodeRelationship = async function () {
    await post("/car-models/" + bru.getEnvVar('validCarModelId') + "/covered-by-programme-episode/" + bru.getEnvVar('validProgrammeEpisodeId'))
}

exports.createHasImageRelationship = async function () {
    await post("/car-models/" + bru.getEnvVar('validCarModelId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/car-models/" + bru.getEnvVar('validCarModelId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasVideoRelationship = async function () {
    await post("/car-models/" + bru.getEnvVar('validCarModelId') + "/has-video/" + bru.getEnvVar('validVideoId'))
}

exports.createHasMainVideoRelationship = async function () {
    await post("/car-models/" + bru.getEnvVar('validCarModelId') + "/has-main-video/" + bru.getEnvVar('validVideoId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/car-models", {
        name: 'Dummy Car Model',
    })

    bru.setEnvVar('valid' + prefix + 'CarModelId', response.id)

    return response.attributes
}
