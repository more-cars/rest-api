const axios = require("axios")
const {ensureValidRaceTrackExists} = require("./RaceTracks")

async function ensureValidTrackLayoutExists() {
    if (!bru.getEnvVar('validTrackLayoutId')) {
        const nodeList = await getAllTrackLayouts()
        if (nodeList.length > 0) {
            bru.setEnvVar("validTrackLayoutId", nodeList[0].data.id)
        } else {
            const newNode = await createTrackLayout()
            bru.setEnvVar("validTrackLayoutId", newNode.data.id)
        } //
    }
}

exports.ensureValidTrackLayoutExists = ensureValidTrackLayoutExists

async function createTrackLayout() {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/track-layouts", {
        name: 'GP Circuit',
    })

    return response.data
}

exports.createTrackLayout = createTrackLayout

async function getAllTrackLayouts() {
    const response = await axios.get(bru.getEnvVar('baseUrl') + "/track-layouts")
    return response.data
}

exports.getAllTrackLayouts = getAllTrackLayouts

async function ensureTrackLayoutBelongsToRaceTrackRelationshipExists() {
    await ensureValidTrackLayoutExists()
    await ensureValidRaceTrackExists()
    await createTrackLayoutBelongsToRaceTrackRelationship(bru.getEnvVar('validTrackLayoutId'), bru.getEnvVar('validRaceTrackId'))
}

exports.ensureTrackLayoutBelongsToRaceTrackRelationshipExists = ensureTrackLayoutBelongsToRaceTrackRelationshipExists

async function createTrackLayoutBelongsToRaceTrackRelationship(trackLayoutId, raceTrackId) {
    const response = await axios.post(bru.getEnvVar('baseUrl') + "/track-layouts/" + trackLayoutId + "/belongs-to-race-track/" + raceTrackId, null, {
        validateStatus: function (status) {
            return status < 400
        }
    })

    return response.data
}

exports.createTrackLayoutBelongsToRaceTrackRelationship = createTrackLayoutBelongsToRaceTrackRelationship
