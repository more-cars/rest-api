const {post} = require("../apiRequest.js")

exports.createByMagazineIssueRelationship = async function () {
    await post("/ratings/" + bru.getEnvVar('validRatingId') + "/relationships/by-magazine-issue", {
        data: {
            type: "by-magazine-issue",
            id: bru.getEnvVar('validMagazineIssueId'),
        },
    })
}

exports.createForCarModelVariantRelationship = async function () {
    await post("/ratings/" + bru.getEnvVar('validRatingId') + "/relationships/for-car-model-variant", {
        data: {
            type: "for-car-model-variant",
            id: bru.getEnvVar('validCarModelVariantId'),
        },
    })
}

exports.createHasImageRelationship = async function () {
    await post("/ratings/" + bru.getEnvVar('validRatingId') + "/relationships/has-image", {
        data: {
            type: "has-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/ratings/" + bru.getEnvVar('validRatingId') + "/relationships/has-prime-image", {
        data: {
            type: "has-prime-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
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
