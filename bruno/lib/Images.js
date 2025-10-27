const {submitPostRequest, submitGetRequest} = require("./request")
const {ensureValidCarModelExists} = require("./CarModels")

async function ensureValidImageExists() {
    if (!bru.getEnvVar('validImageId')) {
        const nodeList = await getAllImages()
        if (nodeList.length > 0) {
            bru.setEnvVar("validImageId", nodeList[0].data.id)
        } else {
            const newNode = await createImage()
            bru.setEnvVar("validImageId", newNode.data.id)
        }
    }
}

exports.ensureValidImageExists = ensureValidImageExists

async function ensureValidSecondImageExists() {
    const nodeList = await getAllImages()
    if (nodeList.length > 1) {
        bru.setEnvVar("validSecondImageId", nodeList[nodeList.length - 1].data.id)
    } else {
        const newNode = await createImage()
        bru.setEnvVar("validSecondImageId", newNode.data.id)
    }
}

exports.ensureValidSecondImageExists = ensureValidSecondImageExists

async function createImage() {
    return submitPostRequest("/images", {
        "image_provider": "picci",
        "external_id": "123456",
    })
}

exports.createImage = createImage

async function getAllImages() {
    return submitGetRequest("/images")
}

exports.getAllImages = getAllImages

async function ensureImageBelongsToNodeRelationshipExists() {
    await ensureValidImageExists()
    await ensureValidCarModelExists()
    await createImageBelongsToNodeRelationship(bru.getEnvVar('validImageId'), bru.getEnvVar('validCarModelId'))
}

exports.ensureImageBelongsToNodeRelationshipExists = ensureImageBelongsToNodeRelationshipExists

async function createImageBelongsToNodeRelationship(imageId, nodeId) {
    return submitPostRequest("/images/" + imageId + "/belongs-to-node/" + nodeId)
}

exports.createImageBelongsToNodeRelationship = createImageBelongsToNodeRelationship
