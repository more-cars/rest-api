const {submitPostRequest, submitGetRequest} = require("./request")

exports.ensureValidCarModelVariantExists = async function () {
    if (!bru.getEnvVar('validCarModelVariantId')) {
        const nodeList = await this.getAllCarModelVariants()
        if (nodeList.length > 0) {
            bru.setEnvVar("validCarModelVariantId", nodeList[0].data.id)
        } else {
            const newNode = await this.createCarModelVariant()
            bru.setEnvVar("validCarModelVariantId", newNode.data.id)
        } //
    }
}

exports.createCarModelVariant = async function () {
    return submitPostRequest("/car-model-variants", {
        name: 'BMW M3',
    })
}

exports.getAllCarModelVariants = async function () {
    return submitGetRequest("/car-model-variants")
}

exports.ensureCarModelVariantIsVariantOfRelationshipExists = async function (carModelVariantId, carModelId) {
    return submitPostRequest("/car-model-variants/" + carModelVariantId + "/is-variant-of/" + carModelId)
}

exports.ensureCarModelVariantAchievedSessionResultRelationshipExists = async function (carModelVariantId, sessionResultId) {
    return submitPostRequest("/car-model-variants/" + carModelVariantId + "/achieved-session-result/" + sessionResultId)
}

exports.ensureCarModelVariantAchievedLapTimeRelationshipExists = async function (carModelVariantId, lapTimeId) {
    return submitPostRequest("/car-model-variants/" + carModelVariantId + "/achieved-lap-time/" + lapTimeId)
}

exports.createCarModelVariantIsFeaturedInRacingGameRelationship = async function (carModelVariantId, racingGameId) {
    return submitPostRequest("/car-model-variants/" + carModelVariantId + "/is-featured-in-racing-game/" + racingGameId)
}

exports.ensureCarModelVariantHasImageRelationshipExists = async function (carModelVariantId, imageId) {
    return submitPostRequest("/car-model-variants/" + carModelVariantId + "/has-image/" + imageId)
}

exports.ensureCarModelVariantHasPrimeImageRelationshipExists = async function (carModelVariantId, imageId) {
    return submitPostRequest("/car-model-variants/" + carModelVariantId + "/has-prime-image/" + imageId)
}
