const {submitPostRequest, submitGetRequest} = require("./request")
const {ensureValidCarModelExists} = require("./CarModels")

async function ensureValidCarModelVariantExists() {
    if (!bru.getEnvVar('validCarModelVariantId')) {
        const nodeList = await getAllCarModelVariants()
        if (nodeList.length > 0) {
            bru.setEnvVar("validCarModelVariantId", nodeList[0].data.id)
        } else {
            const newNode = await createCarModelVariant()
            bru.setEnvVar("validCarModelVariantId", newNode.data.id)
        } //
    }
}

exports.ensureValidCarModelVariantExists = ensureValidCarModelVariantExists

async function createCarModelVariant() {
    return submitPostRequest("/car-model-variants", {
        name: 'BMW M3',
    })
}

exports.createCarModelVariant = createCarModelVariant

async function getAllCarModelVariants() {
    return submitGetRequest("/car-model-variants")
}

exports.getAllCarModelVariants = getAllCarModelVariants

async function ensureCarModelVariantIsVariantOfRelationshipExists() {
    await ensureValidCarModelVariantExists()
    await ensureValidCarModelExists()
    await createCarModelVariantIsVariantOfRelationship(bru.getEnvVar('validCarModelVariantId'), bru.getEnvVar('validCarModelId'))
}

exports.ensureCarModelVariantIsVariantOfRelationshipExists = ensureCarModelVariantIsVariantOfRelationshipExists

async function createCarModelVariantIsVariantOfRelationship(carModelVariantId, carModelId) {
    return submitPostRequest("/car-model-variants/" + carModelVariantId + "/is-variant-of/" + carModelId)
}

exports.createCarModelVariantIsVariantOfRelationship = createCarModelVariantIsVariantOfRelationship
