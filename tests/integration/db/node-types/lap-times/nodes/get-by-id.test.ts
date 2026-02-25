import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../../src/db/node-types/lap-times/getNodeById"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {LapTimeSchema} from "../../../../../_toolbox/schemas/db/LapTimeSchema"
import {validateJson} from "../../../../../_toolbox/validateJson"

test('Querying a LAP TIME that does not exist should return "false"', async () => {
    const expectedLapTimeNode = false
    const actualLapTimeNode = await getNodeById(-42)

    expect(actualLapTimeNode)
        .toBe(expectedLapTimeNode)
})

test('Querying an existing LAP TIME should return a db node with correct schema', async () => {
    const createdNode = await seedNode(DbNodeType.LapTime)
    const lapTimeNode = await getNodeById(createdNode.properties.id)

    expect(validateJson(lapTimeNode, LapTimeSchema))
        .toBeTruthy()
})
