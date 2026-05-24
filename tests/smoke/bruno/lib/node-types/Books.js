const {post} = require("../apiRequest.js")

exports.createCoversCarModelVariantRelationship = async function () {
    await post("/books/" + bru.getEnvVar('validBookId') + "/covers-car-model-variant/" + bru.getEnvVar('validCarModelVariantId'))
}

exports.createHasVideoRelationship = async function () {
    await post("/books/" + bru.getEnvVar('validBookId') + "/has-video/" + bru.getEnvVar('validVideoId'))
}

exports.createHasMainVideoRelationship = async function () {
    await post("/books/" + bru.getEnvVar('validBookId') + "/has-main-video/" + bru.getEnvVar('validVideoId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/books", {
        title: 'Dummy Book',
    })

    bru.setEnvVar('valid' + prefix + 'BookId', response.id)

    return response.attributes
}
