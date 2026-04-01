const {post} = require("../apiRequest.js")

exports.createBelongsToMagazineRelationship = async function () {
    await post("/magazine-issues/" + bru.getEnvVar('validMagazineIssueId') + "/belongs-to-magazine/" + bru.getEnvVar('validMagazineId'))
}

exports.createFollowsIssueRelationship = async function () {
    await post("/magazine-issues/" + bru.getEnvVar('validMagazineIssueId') + "/follows-issue/" + bru.getEnvVar('validSecondMagazineIssueId'))
}

exports.createFollowedByIssueRelationship = async function () {
    await post("/magazine-issues/" + bru.getEnvVar('validMagazineIssueId') + "/followed-by-issue/" + bru.getEnvVar('validSecondMagazineIssueId'))
}

exports.createCoversCarModelRelationship = async function () {
    await post("/magazine-issues/" + bru.getEnvVar('validMagazineIssueId') + "/covers-car-model/" + bru.getEnvVar('validCarModelId'))
}

exports.createPresentsCarModelVariantRelationship = async function () {
    await post("/magazine-issues/" + bru.getEnvVar('validMagazineIssueId') + "/presents-car-model-variant/" + bru.getEnvVar('validCarModelVariantId'))
}

exports.createReviewedCarModelVariantWithRatingRelationship = async function () {
    await post("/magazine-issues/" + bru.getEnvVar('validMagazineIssueId') + "/reviewed-car-model-variant-with-rating/" + bru.getEnvVar('validRatingId'))
}

exports.createCoversRacingEventRelationship = async function () {
    await post("/magazine-issues/" + bru.getEnvVar('validMagazineIssueId') + "/covers-racing-event/" + bru.getEnvVar('validRacingEventId'))
}

exports.createHasImageRelationship = async function () {
    await post("/magazine-issues/" + bru.getEnvVar('validMagazineIssueId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/magazine-issues/" + bru.getEnvVar('validMagazineIssueId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasVideoRelationship = async function () {
    await post("/magazine-issues/" + bru.getEnvVar('validMagazineIssueId') + "/has-video/" + bru.getEnvVar('validVideoId'))
}

exports.createHasMainVideoRelationship = async function () {
    await post("/magazine-issues/" + bru.getEnvVar('validMagazineIssueId') + "/has-main-video/" + bru.getEnvVar('validVideoId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/magazine-issues", {
        title: 'Dummy Magazine Issue',
    })

    bru.setEnvVar('valid' + prefix + 'MagazineIssueId', response.id)

    return response.attributes
}
