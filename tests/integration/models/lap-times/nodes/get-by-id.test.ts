import {expect, test} from 'vitest'
import {LapTime} from "../../../../../src/models/lap-times/LapTime"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {LapTimeNode} from "../../../../../src/models/lap-times/types/LapTimeNode"

test('Fetching a LAP TIME that does not exist should return "false"', async () => {
    const expectedLapTime = false
    const actualLapTime = await LapTime.findById(-42)

    expect(actualLapTime)
        .toEqual(expectedLapTime)
})

test('When the LAP TIME exists it should be returned', async () => {
    const expectedLapTime = await seedNode(NodeTypeEnum.LAP_TIME) as LapTimeNode
    const actualLapTime = await LapTime.findById(expectedLapTime.id)

    expect(actualLapTime)
        .toEqual(expectedLapTime)
})
