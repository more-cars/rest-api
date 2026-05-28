const {post} = require("../apiRequest.js")

exports.createHasBrandRelationship = async function () {
    await post("/companies/" + bru.getEnvVar('validCompanyId') + "/relationships/has-brand", {
        data: {
            type: "has-brand",
            id: bru.getEnvVar('validBrandId'),
        },
    })
}

exports.createHasImageRelationship = async function () {
    await post("/companies/" + bru.getEnvVar('validCompanyId') + "/relationships/has-image", {
        data: {
            type: "has-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/companies/" + bru.getEnvVar('validCompanyId') + "/relationships/has-prime-image", {
        data: {
            type: "has-prime-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasVideoRelationship = async function () {
    await post("/companies/" + bru.getEnvVar('validCompanyId') + "/relationships/has-video", {
        data: {
            type: "has-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.createHasMainVideoRelationship = async function () {
    await post("/companies/" + bru.getEnvVar('validCompanyId') + "/relationships/has-main-video", {
        data: {
            type: "has-main-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.create = async function (prefix = '') {
    const response = await post("/companies", {
        name: 'Dummy Company',
    })

    bru.setEnvVar('valid' + prefix + 'CompanyId', response.id)

    return response.attributes
}
