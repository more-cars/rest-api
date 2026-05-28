const {post} = require("../apiRequest.js")

exports.createCreatedModelCarRelationship = async function () {
    await post("/model-car-brands/" + bru.getEnvVar('validModelCarBrandId') + "/relationships/created-model-car", {
        data: {
            type: "created-model-car",
            id: bru.getEnvVar('validModelCarId'),
        },
    })
}

exports.createHasImageRelationship = async function () {
    await post("/model-car-brands/" + bru.getEnvVar('validModelCarBrandId') + "/relationships/has-image", {
        data: {
            type: "has-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/model-car-brands/" + bru.getEnvVar('validModelCarBrandId') + "/relationships/has-prime-image", {
        data: {
            type: "has-prime-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasVideoRelationship = async function () {
    await post("/model-car-brands/" + bru.getEnvVar('validModelCarBrandId') + "/relationships/has-video", {
        data: {
            type: "has-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.createHasMainVideoRelationship = async function () {
    await post("/model-car-brands/" + bru.getEnvVar('validModelCarBrandId') + "/relationships/has-main-video", {
        data: {
            type: "has-main-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.create = async function (prefix = '') {
    const response = await post("/model-car-brands", {
        name: 'Dummy Model Car Brand',
    })

    bru.setEnvVar('valid' + prefix + 'ModelCarBrandId', response.id)

    return response.attributes
}
