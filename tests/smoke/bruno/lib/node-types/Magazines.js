const {post} = require("../apiRequest.js")

exports.createHasIssueRelationship = async function () {
    await post("/magazines/" + bru.getEnvVar('validMagazineId') + "/relationships/has-issue", {
        data: {
            type: "has-issue",
            id: bru.getEnvVar('validMagazineIssueId'),
        },
    })
}

exports.createHasImageRelationship = async function () {
    await post("/magazines/" + bru.getEnvVar('validMagazineId') + "/relationships/has-image", {
        data: {
            type: "has-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasPrimeImageRelationship = async function () {
    await post("/magazines/" + bru.getEnvVar('validMagazineId') + "/relationships/has-prime-image", {
        data: {
            type: "has-prime-image",
            id: bru.getEnvVar('validImageId'),
        },
    })
}

exports.createHasVideoRelationship = async function () {
    await post("/magazines/" + bru.getEnvVar('validMagazineId') + "/relationships/has-video", {
        data: {
            type: "has-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.createHasMainVideoRelationship = async function () {
    await post("/magazines/" + bru.getEnvVar('validMagazineId') + "/relationships/has-main-video", {
        data: {
            type: "has-main-video",
            id: bru.getEnvVar('validVideoId'),
        },
    })
}

exports.create = async function (prefix = '') {
    const response = await post("/magazines", {
        name: 'Dummy Magazine',
    })

    bru.setEnvVar('valid' + prefix + 'MagazineId', response.id)

    return response.attributes
}
