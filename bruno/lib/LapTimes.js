const {submitPostRequest, submitGetRequest} = require("./request")

async function ensureValidLapTimeExists() {
    if (!bru.getEnvVar('validLapTimeId')) {
        const newNode = await createLapTime()
        bru.setEnvVar("validLapTimeId", newNode.data.id)
    }
}

exports.ensureValidLapTimeExists = ensureValidLapTimeExists

async function createLapTime() {
    return submitPostRequest("/lap-times", {
        time: 'PT1M33.294S',
        driver_name: 'Klaus Ludwig',
    })
}

exports.createLapTime = createLapTime
