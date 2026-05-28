const {post} = require("../apiRequest.js")

exports.createBelongsToCompanyRelationship = async function () {
    await post("/brands/" + bru.getEnvVar('validBrandId') + "/relationships/belongs-to-company", {
        data: {
            type: "belongs-to-company",
            id: bru.getEnvVar('validCompanyId'),
        },
    })
}

exports.createHasCarModelRelationship = async function () {
    await post("/brands/" + bru.getEnvVar('validBrandId') + "/relationships/has-car-model", {
        data: {
            type: "has-car-model",
            id: bru.getEnvVar('validCarModelId'),
        },
    })
}

exports.createHasImageRelationship = async function () {
    await post("/brands/" + bru.getEnvVar('validBrandId') + "/relationships/has-image", {
        data: {
            type: "has-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/brands/" + bru.getEnvVar('validBrandId') + "/relationships/has-prime-image", {
        data: {
            type: "has-prime-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasVideoRelationship = async function () {
    await post("/brands/" + bru.getEnvVar('validBrandId') + "/relationships/has-video", {
        data: {
            type: "has-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.createHasMainVideoRelationship = async function () {
    await post("/brands/" + bru.getEnvVar('validBrandId') + "/relationships/has-main-video", {
        data: {
            type: "has-main-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.create = async function (prefix = '') {
    const response = await post("/brands", {
        name: 'Dummy Brand',
    })

    bru.setEnvVar('valid' + prefix + 'BrandId', response.id)

    return response.attributes
}
