const {post} = require("../apiRequest.js")

exports.createCoversCarModelVariantRelationship = async function () {
    await post("/books/" + bru.getEnvVar('validBookId') + "/relationships/covers-car-model-variant", {
        data: {
            type: "covers-car-model-variant",
            id: bru.getEnvVar('validCarModelVariantId'),
        },
    })
}

exports.createHasImageRelationship = async function () {
    await post("/books/" + bru.getEnvVar('validBookId') + "/relationships/has-image", {
        data: {
            type: "has-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/books/" + bru.getEnvVar('validBookId') + "/relationships/has-prime-image", {
        data: {
            type: "has-prime-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasVideoRelationship = async function () {
    await post("/books/" + bru.getEnvVar('validBookId') + "/relationships/has-video", {
        data: {
            type: "has-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.createHasMainVideoRelationship = async function () {
    await post("/books/" + bru.getEnvVar('validBookId') + "/relationships/has-main-video", {
        data: {
            type: "has-main-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.create = async function (prefix = '') {
    const response = await post("/books", {
        title: 'Dummy Book',
    })

    bru.setEnvVar('valid' + prefix + 'BookId', response.id)

    return response.attributes
}
