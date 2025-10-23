import {describe, expect, test} from 'vitest'
import {RacingSeries} from "../../../../../src/models/racing-series/RacingSeries"
import {seedRacingSeries} from "../../../../_toolbox/dbSeeding/racing-series/nodes/seedRacingSeries"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

describe('Deleting a RACING SERIES', () => {
    test('that does not exist', async () => {
        await expect(RacingSeries.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedRacingSeries()
        await expect(RacingSeries.delete(node.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
