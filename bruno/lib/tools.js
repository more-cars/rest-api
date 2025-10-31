exports.generateInvalidId = function generateInvalidId(nodeType) {
    bru.setEnvVar("invalid" + nodeType + "Id", Math.ceil(Math.random() * 100000))
}

exports.generateSecondInvalidId = function generateSecondInvalidId(nodeType) {
    bru.setEnvVar("invalidSecond" + nodeType + "Id", Math.ceil(Math.random() * 100000))
}
