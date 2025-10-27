const {submitPostRequest} = require("./request")
const {createBrand} = require("./Brands")
const {createCarModel} = require("./CarModels")

async function ensureValidRelationshipExists() {
    if (!bru.getEnvVar('validRelationshipId')) {
        const startNode = await createBrand()
        const endNode = await createCarModel()
        const newRelationship = await createRelationship(startNode.data.id, endNode.data.id)

        bru.setEnvVar("validRelationshipId", newRelationship.data.relationship_id)
    }
}

exports.ensureValidRelationshipExists = ensureValidRelationshipExists

async function createRelationship(brandId, carModelId) {
    return submitPostRequest("/brands/" + brandId + "/has-car-model/" + carModelId)
}

exports.createRelationship = createRelationship
