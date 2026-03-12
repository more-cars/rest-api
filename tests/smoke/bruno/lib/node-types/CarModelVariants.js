const {post} = require("../apiRequest.js")

exports.createIsVariantOfRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/is-variant-of/" + bru.getEnvVar('validCarModelId'))
}

exports.createAchievedSessionResultRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/achieved-session-result/" + bru.getEnvVar('validSessionResultId'))
}

exports.createAchievedLapTimeRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/achieved-lap-time/" + bru.getEnvVar('validLapTimeId'))
}

exports.createIsPresentedInMagazineIssueRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/is-presented-in-magazine-issue/" + bru.getEnvVar('validMagazineIssueId'))
}

exports.createReviewedByMagazineIssueWithRatingRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/reviewed-by-magazine-issue-with-rating/" + bru.getEnvVar('validRatingId'))
}

exports.createPresentedInProgrammeEpisodeRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/presented-in-programme-episode/" + bru.getEnvVar('validProgrammeEpisodeId'))
}

exports.createIsFeaturedInRacingGameRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/is-featured-in-racing-game/" + bru.getEnvVar('validRacingGameId'))
}

exports.createPresentedAtMotorShowRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/presented-at-motor-show/" + bru.getEnvVar('validMotorShowId'))
}

exports.createHasImageRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/car-model-variants/" + bru.getEnvVar('validCarModelVariantId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/car-model-variants", {
        name: 'Dummy Car Model Variant',
    })

    bru.setEnvVar('valid' + prefix + 'CarModelVariantId', response.id)

    return response.attributes
}