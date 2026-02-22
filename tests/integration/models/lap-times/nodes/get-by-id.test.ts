import {expect, test} from 'vitest'
import {LapTime} from "../../../../../src/models/node-types/lap-times/LapTime"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

test('Fetching a LAP TIME that does not exist should return "false"', async () => {
    const expectedLapTime = false
    const actualLapTime = await LapTime.findById(-42)

    expect(actualLapTime)
        .toEqual(expectedLapTime)
})

test('When the LAP TIME exists it should be returned', async () => {
    const expectedLapTime = await seedNode(DbNodeType.LapTime)
    const actualLapTime = await LapTime.findById(expectedLapTime.properties.id)

    expect(actualLapTime.attributes)
        .toEqual(expectedLapTime.properties)
})
