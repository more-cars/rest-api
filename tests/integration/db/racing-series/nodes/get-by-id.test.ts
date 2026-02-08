import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../src/db/nodes/racing-series/getNodeById"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSeriesSchema} from "../../../../_toolbox/schemas/RacingSeriesSchema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying a RACING SERIES that does not exist should return "false"', async () => {
    const expectedRacingSeriesNode = false
    const actualRacingSeriesNode = await getNodeById(-42)

    expect(actualRacingSeriesNode)
        .toBe(expectedRacingSeriesNode)
})

test('Querying an existing RACING SERIES should return a db node with correct schema', async () => {
    const createdNode = await seedNode(NodeTypeEnum.RACING_SERIES)
    const racingSeriesNode = await getNodeById(createdNode.id)

    expect(validateJson(racingSeriesNode, RacingSeriesSchema))
        .toBeTruthy()
})
