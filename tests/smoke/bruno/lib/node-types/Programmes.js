const {post} = require("../apiRequest.js")

exports.createHasEpisodeRelationship = async function () {
    await post("/programmes/" + bru.getEnvVar('validProgrammeId') + "/relationships/has-episode", {
        data: {
            type: "has-episode",
            id: bru.getEnvVar('validProgrammeEpisodeId'),
        },
    })
}

exports.createHasImageRelationship = async function () {
    await post("/programmes/" + bru.getEnvVar('validProgrammeId') + "/relationships/has-image", {
        data: {
            type: "has-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/programmes/" + bru.getEnvVar('validProgrammeId') + "/relationships/has-prime-image", {
        data: {
            type: "has-prime-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasVideoRelationship = async function () {
    await post("/programmes/" + bru.getEnvVar('validProgrammeId') + "/relationships/has-video", {
        data: {
            type: "has-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.createHasMainVideoRelationship = async function () {
    await post("/programmes/" + bru.getEnvVar('validProgrammeId') + "/relationships/has-main-video", {
        data: {
            type: "has-main-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.create = async function (prefix = '') {
    const response = await post("/programmes", {
        name: 'Dummy Programme',
    })

    bru.setEnvVar('valid' + prefix + 'ProgrammeId', response.id)

    return response.attributes
}
