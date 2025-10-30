const {submitPostRequest, submitGetRequest} = require("./request")

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
