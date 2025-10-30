const {submitPostRequest, submitGetRequest} = require("./request")

async function ensureValidCarModelVariantExists() {
    if (!bru.getEnvVar('validCarModelVariantId')) {
        const newNode = await createCarModelVariant()
        bru.setEnvVar("validCarModelVariantId", newNode.data.id)
    }
}

exports.ensureValidCarModelVariantExists = ensureValidCarModelVariantExists

async function createCarModelVariant() {
    return submitPostRequest("/car-model-variants", {
        name: 'BMW M3',
    })
}

exports.createCarModelVariant = createCarModelVariant
