import {expect, test} from 'vitest'
import {RacingSeries} from "../../../../../src/models/node-types/racing-series/RacingSeries"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Fetching a RACING SERIES that does not exist should return "false"', async () => {
    const expectedRacingSeries = false
    const actualRacingSeries = await RacingSeries.findById(-42)

    expect(actualRacingSeries)
        .toEqual(expectedRacingSeries)
})

test('When the RACING SERIES exists it should be returned', async () => {
    const expectedRacingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)
    const actualRacingSeries = await RacingSeries.findById(expectedRacingSeries.id)

    expect(actualRacingSeries)
        .toEqual(expectedRacingSeries)
})
