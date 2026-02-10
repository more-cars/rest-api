const {post} = require("../apiRequest.js")

exports.create = async function (prefix = '') {
    const response = await post("/lap-times", {
        time: 'Dummy Lap Time',
        driver_name: 'Dummy Lap Time',
    })
    const lapTime = response.data
    bru.setEnvVar('valid' + prefix + 'LapTimeId', lapTime.id)

    return lapTime
}
