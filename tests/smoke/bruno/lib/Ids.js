exports.generateInvalidId = function (nodeType) {
    bru.setEnvVar("invalid" + nodeType + "Id", Math.ceil(Math.random() * 100000))
}

exports.forgetId = function (nodeType) {
    bru.setEnvVar("valid" + nodeType + "Id", null)
}
