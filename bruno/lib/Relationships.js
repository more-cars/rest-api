const {submitPostRequest} = require("./request")

exports.ensureValidRelationshipExists = async function (brandId, carModelId) {
    const newRelationship = await submitPostRequest("/brands/" + brandId + "/has-car-model/" + carModelId)

    bru.setEnvVar("validRelationshipId", newRelationship.data.relationship_id)
}
