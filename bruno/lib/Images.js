const axios = require("axios")

async function ensureValidImageExists() {
    if (!bru.getEnvVar('validImageId')) {
        const nodeList = await getAllImages()
        if (nodeList.length > 0) {
            bru.setEnvVar("validImageId", nodeList[0].id)
        } else {
            const newNode = await createImage()
            bru.setEnvVar("validImageId", newNode.id)
        }
    }
}

exports.ensureValidImageExists = ensureValidImageExists

async function ensureValidSecondImageExists() {
    if (!bru.getEnvVar('validSecondImageId')) {
        const nodeList = await getAllImages()
        if (nodeList.length > 1) {
            bru.setEnvVar("validSecondImageId", nodeList[1].id)
        } else {
            const newNode = await createImage()
            bru.setEnvVar("validSecondImageId", newNode.id)
        }
    }
}

exports.ensureValidSecondImageExists = ensureValidSecondImageExists

async function createImage() {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/images", {
        "image_provider": "picci",
        "external_id": "123456",
    })
    return response.data
}

exports.createImage = createImage

async function getAllImages() {
    const response = await axios.get(bru.getEnvVar('baseUrl') + "/images")
    return response.data
}

exports.getAllImages = getAllImages

async function getImageById(id) {
    const response = await axios.get(bru.getEnvVar('baseUrl') + "/images/" + id)
    return response.data
}

exports.getImageById = getImageById
