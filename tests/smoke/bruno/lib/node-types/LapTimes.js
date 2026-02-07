const {post} = require("../apiRequest.js")

exports.createLapTime = async function () {
    const response = await post("/lap-times", {
        time: 'Dummy Lap Time',
        driver_name: 'Dummy Lap Time',
    })
    const lapTime = response.data
    bru.setEnvVar('validLapTimeId', lapTime.id)

    return lapTime
}
