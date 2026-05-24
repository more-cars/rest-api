const {post} = require("../apiRequest.js")

exports.createCoversCarModelVariantRelationship = async function () {
    await post("/books/" + bru.getEnvVar('validBookId') + "/covers-car-model-variant/" + bru.getEnvVar('validCarModelVariantId'))
}

exports.create = async function (prefix = '') {
    const response = await post("/books", {
        title: 'Dummy Book',
    })

    bru.setEnvVar('valid' + prefix + 'BookId', response.id)

    return response.attributes
}
