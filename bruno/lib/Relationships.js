const axios = require("axios")
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
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/brands/" + brandId + "/has-car-model/" + carModelId, null, {
        validateStatus: function (status) {
            return status < 400
        }
    })

    return response.data
}

exports.createRelationship = createRelationship
