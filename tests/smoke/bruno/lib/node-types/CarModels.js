const {post} = require("../apiRequest.js")

exports.createBelongsToBrandRelationship = async function () {
    await post("/car-models/" + bru.getEnvVar('validCarModelId') + "/relationships/belongs-to-brand", {
        data: {
            type: "belongs-to-brand",
            id: bru.getEnvVar('validBrandId'),
        },
    })
}

exports.createHasSuccessorRelationship = async function () {
    await post("/car-models/" + bru.getEnvVar('validCarModelId') + "/relationships/has-successor", {
        data: {
            type: "has-successor",
            id: bru.getEnvVar('validSecondCarModelId'),
        },
    })
}

exports.createIsSuccessorOfRelationship = async function () {
    await post("/car-models/" + bru.getEnvVar('validCarModelId') + "/relationships/is-successor-of", {
        data: {
            type: "is-successor-of",
            id: bru.getEnvVar('validSecondCarModelId'),
        },
    })
}

exports.createHasVariantRelationship = async function () {
    await post("/car-models/" + bru.getEnvVar('validCarModelId') + "/relationships/has-variant", {
        data: {
            type: "has-variant",
            id: bru.getEnvVar('validCarModelVariantId'),
        },
    })
}

exports.createCoveredByMagazineIssueRelationship = async function () {
    await post("/car-models/" + bru.getEnvVar('validCarModelId') + "/relationships/covered-by-magazine-issue", {
        data: {
            type: "covered-by-magazine-issue",
            id: bru.getEnvVar('validMagazineIssueId'),
        },
    })
}

exports.createCoveredByProgrammeEpisodeRelationship = async function () {
    await post("/car-models/" + bru.getEnvVar('validCarModelId') + "/relationships/covered-by-programme-episode", {
        data: {
            type: "covered-by-programme-episode",
            id: bru.getEnvVar('validProgrammeEpisodeId'),
        },
    })
}

exports.createHasImageRelationship = async function () {
    await post("/car-models/" + bru.getEnvVar('validCarModelId') + "/relationships/has-image", {
        data: {
            type: "has-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/car-models/" + bru.getEnvVar('validCarModelId') + "/relationships/has-prime-image", {
        data: {
            type: "has-prime-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasVideoRelationship = async function () {
    await post("/car-models/" + bru.getEnvVar('validCarModelId') + "/relationships/has-video", {
        data: {
            type: "has-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.createHasMainVideoRelationship = async function () {
    await post("/car-models/" + bru.getEnvVar('validCarModelId') + "/relationships/has-main-video", {
        data: {
            type: "has-main-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.create = async function (prefix = '') {
    const response = await post("/car-models", {
        name: 'Dummy Car Model',
    })

    bru.setEnvVar('valid' + prefix + 'CarModelId', response.id)

    return response.attributes
}
