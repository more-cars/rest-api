const {post} = require("../apiRequest.js")

exports.createByMagazineIssueRelationship = async function () {
    await post("/ratings/" + bru.getEnvVar('validRatingId') + "/by-magazine-issue/" + bru.getEnvVar('validMagazineIssueId'))
}

exports.createForCarModelVariantRelationship = async function () {
    await post("/ratings/" + bru.getEnvVar('validRatingId') + "/for-car-model-variant/" + bru.getEnvVar('validCarModelVariantId'))
}

exports.createHasImageRelationship = async function () {
    await post("/ratings/" + bru.getEnvVar('validRatingId') + "/has-image/" + bru.getEnvVar('validImageId'))
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/ratings/" + bru.getEnvVar('validRatingId') + "/has-prime-image/" + bru.getEnvVar('validImageId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/ratings", {
        rating_value: 93,
        scale_minimum: 0,
        scale_maximum: 100,
        scale_direction: 'up',
    })

    bru.setEnvVar('valid' + prefix + 'RatingId', response.id)

    return response.attributes
}
