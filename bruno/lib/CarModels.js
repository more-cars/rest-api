const {submitPostRequest, submitGetRequest} = require("./request")

exports.ensureValidCarModelExists = async function () {
    if (!bru.getEnvVar('validCarModelId')) {
        const nodeList = await this.getAllCarModels()
        if (nodeList.length > 0) {
            bru.setEnvVar("validCarModelId", nodeList[0].data.id)
        } else {
            const newNode = await this.createCarModel()
            bru.setEnvVar("validCarModelId", newNode.data.id)
        }
    }
}

exports.ensureValidSecondCarModelExists = async function () {
    const nodeList = await this.getAllCarModels()
    if (nodeList.length > 1) {
        bru.setEnvVar("validSecondCarModelId", nodeList[nodeList.length - 1].data.id)
    } else {
        const newNode = await this.createCarModel()
        bru.setEnvVar("validSecondCarModelId", newNode.data.id)
    }
}

exports.createCarModel = async function () {
    return submitPostRequest("/car-models", {
        name: 'Dummy'
    })
}

exports.getAllCarModels = async function () {
    return submitGetRequest("/car-models")
}

exports.ensureCarModelBelongsToBrandRelationshipExists = async function (carModelId, brandId) {
    return submitPostRequest("/car-models/" + carModelId + "/belongs-to-brand/" + brandId)
}

exports.ensureCarModelHasSuccessorRelationshipExists = async function (carModelId, partnerId) {
    return submitPostRequest("/car-models/" + carModelId + "/has-successor/" + partnerId)
}

exports.ensureCarModelIsSuccessorOfRelationshipExists = async function (carModelId, partnerId) {
    return submitPostRequest("/car-models/" + carModelId + "/is-successor-of/" + partnerId)
}

exports.ensureCarModelHasImageRelationshipExists = async function (carModelId, imageId) {
    return submitPostRequest("/car-models/" + carModelId + "/has-image/" + imageId)
}

exports.ensureCarModelHasPrimeImageRelationshipExists = async function (carModelId, imageId) {
    return submitPostRequest("/car-models/" + carModelId + "/has-prime-image/" + imageId)
}

exports.ensureCarModelHasVariantRelationshipExists = async function (carModelId, carModelVariantId) {
    return submitPostRequest("/car-models/" + carModelId + "/has-variant/" + carModelVariantId)
}
