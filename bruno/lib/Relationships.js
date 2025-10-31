const {submitPostRequest} = require("./request")
const {createBrand} = require("./Brands")
const {createCarModel} = require("./CarModels")

exports.ensureValidRelationshipExists = async function () {
    if (!bru.getEnvVar('validRelationshipId')) {
        const startNode = await createBrand()
        const endNode = await createCarModel()
        const newRelationship = await this.createRelationship(startNode.data.id, endNode.data.id)

        bru.setEnvVar("validRelationshipId", newRelationship.data.relationship_id)
    }
}

exports.createRelationship = async function (brandId, carModelId) {
    return submitPostRequest("/brands/" + brandId + "/has-car-model/" + carModelId)
}
