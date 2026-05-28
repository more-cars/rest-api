const {post} = require("../apiRequest.js")

exports.createBelongsToRacingSessionRelationship = async function () {
    await post("/session-results/" + bru.getEnvVar('validSessionResultId') + "/relationships/belongs-to-racing-session", {
        data: {
            type: "belongs-to-racing-session",
            id: bru.getEnvVar('validRacingSessionId'),
        },
    })
}

exports.createAchievedWithCarModelVariantRelationship = async function () {
    await post("/session-results/" + bru.getEnvVar('validSessionResultId') + "/relationships/achieved-with-car-model-variant", {
        data: {
            type: "achieved-with-car-model-variant",
            id: bru.getEnvVar('validCarModelVariantId'),
        },
    })
}

exports.createHasLapTimeRelationship = async function () {
    await post("/session-results/" + bru.getEnvVar('validSessionResultId') + "/relationships/has-lap-time", {
        data: {
            type: "has-lap-time",
            id: bru.getEnvVar('validLapTimeId'),
        },
    })
}

exports.createHasImageRelationship = async function () {
    await post("/session-results/" + bru.getEnvVar('validSessionResultId') + "/relationships/has-image", {
        data: {
            type: "has-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/session-results/" + bru.getEnvVar('validSessionResultId') + "/relationships/has-prime-image", {
        data: {
            type: "has-prime-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.create = async function (prefix = '') {
    const response = await post("/session-results", {
        position: 1,
        driver_name: 'Dummy Session Result',
    })

    bru.setEnvVar('valid' + prefix + 'SessionResultId', response.id)

    return response.attributes
}
