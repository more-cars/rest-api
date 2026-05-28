const {post} = require("../apiRequest.js")

exports.createPresentsCarModelVariantRelationship = async function () {
    await post("/motor-shows/" + bru.getEnvVar('validMotorShowId') + "/relationships/presents-car-model-variant", {
        data: {
            type: "presents-car-model-variant",
            id: bru.getEnvVar('validCarModelVariantId'),
        },
    })
}

exports.createHasImageRelationship = async function () {
    await post("/motor-shows/" + bru.getEnvVar('validMotorShowId') + "/relationships/has-image", {
        data: {
            type: "has-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/motor-shows/" + bru.getEnvVar('validMotorShowId') + "/relationships/has-prime-image", {
        data: {
            type: "has-prime-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasVideoRelationship = async function () {
    await post("/motor-shows/" + bru.getEnvVar('validMotorShowId') + "/relationships/has-video", {
        data: {
            type: "has-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.createHasMainVideoRelationship = async function () {
    await post("/motor-shows/" + bru.getEnvVar('validMotorShowId') + "/relationships/has-main-video", {
        data: {
            type: "has-main-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.create = async function (prefix = '') {
    const response = await post("/motor-shows", {
        name: 'Dummy Motor Show',
    })

    bru.setEnvVar('valid' + prefix + 'MotorShowId', response.id)

    return response.attributes
}
