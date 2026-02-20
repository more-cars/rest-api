import {expect, test} from 'vitest'
import {LapTime} from "../../../../../src/models/node-types/lap-times/LapTime"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"

test('Fetching a LAP TIME that does not exist should return "false"', async () => {
    const expectedLapTime = false
    const actualLapTime = await LapTime.findById(-42)

    expect(actualLapTime)
        .toEqual(expectedLapTime)
})

test('When the LAP TIME exists it should be returned', async () => {
    const expectedLapTime = await seedNode(ControllerNodeType.LAP_TIME)
    const actualLapTime = await LapTime.findById(expectedLapTime.properties.id)

    expect(actualLapTime.attributes)
        .toEqual(expectedLapTime.properties)
})
