import {describe, expect, test} from 'vitest'
import {RacingSeries} from "../../../../../../src/models/node-types/racing-series/RacingSeries"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Fetching a RACING SERIES', () => {
    test('which does not exist', async () => {
        await expect(RacingSeries.findById(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('which exists', async () => {
        const expectedRacingSeries = await seedNode(DbNodeType.RacingSeries)
        const actualRacingSeries = await RacingSeries.findById(expectedRacingSeries.properties.id)

        expect(actualRacingSeries.attributes)
            .toEqual(expectedRacingSeries.properties)
    })
})
