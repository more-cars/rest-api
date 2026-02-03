const {submitPostRequest, submitGetRequest} = require("./request")

exports.ensureValidBrandExists = async function () {
    if (!bru.getEnvVar('validBrandId')) {
        const nodeList = await this.getAllBrands()
        if (nodeList.length > 0) {
            bru.setEnvVar("validBrandId", nodeList[0].data.id)
        } else {
            const newNode = await this.createBrand()
            bru.setEnvVar("validBrandId", newNode.data.id)
        }
    }
}

exports.createBrand = async function () {
    return submitPostRequest("/brands", {
        name: 'Dummy'
    })
}

exports.getAllBrands = async function () {
    return submitGetRequest("/brands")
}

exports.ensureBrandBelongsToCompanyRelationshipExists = async function (brandId, companyId) {
    return submitPostRequest("/brands/" + brandId + "/belongs-to-company/" + companyId)
}

exports.ensureBrandHasCarModelRelationshipExists = async function (brandId, carModelId) {
    return submitPostRequest("/brands/" + brandId + "/has-car-model/" + carModelId)
}

exports.ensureBrandHasImageRelationshipExists = async function (brandId, imageId) {
    return submitPostRequest("/brands/" + brandId + "/has-image/" + imageId)
}

exports.ensureBrandHasPrimeImageRelationshipExists = async function (brandId, imageId) {
    return submitPostRequest("/brands/" + brandId + "/has-prime-image/" + imageId)
}
