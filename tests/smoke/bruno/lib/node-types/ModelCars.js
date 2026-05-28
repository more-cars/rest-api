const {post} = require("../apiRequest.js")

exports.createIsScaleModelOfCarModelVariantRelationship = async function () {
    await post("/model-cars/" + bru.getEnvVar('validModelCarId') + "/relationships/is-scale-model-of-car-model-variant", {
        data: {
            type: "is-scale-model-of-car-model-variant",
            id: bru.getEnvVar('validCarModelVariantId'),
        },
    })
}

exports.createMadeByModelCarBrandRelationship = async function () {
    await post("/model-cars/" + bru.getEnvVar('validModelCarId') + "/relationships/made-by-model-car-brand", {
        data: {
            type: "made-by-model-car-brand",
            id: bru.getEnvVar('validModelCarBrandId'),
        },
    })
}

exports.createHasImageRelationship = async function () {
    await post("/model-cars/" + bru.getEnvVar('validModelCarId') + "/relationships/has-image", {
        data: {
            type: "has-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/model-cars/" + bru.getEnvVar('validModelCarId') + "/relationships/has-prime-image", {
        data: {
            type: "has-prime-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasVideoRelationship = async function () {
    await post("/model-cars/" + bru.getEnvVar('validModelCarId') + "/relationships/has-video", {
        data: {
            type: "has-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.createHasMainVideoRelationship = async function () {
    await post("/model-cars/" + bru.getEnvVar('validModelCarId') + "/relationships/has-main-video", {
        data: {
            type: "has-main-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.create = async function (prefix = '') {
    const response = await post("/model-cars", {
        name: 'Dummy Model Car',
    })

    bru.setEnvVar('valid' + prefix + 'ModelCarId', response.id)

    return response.attributes
}
