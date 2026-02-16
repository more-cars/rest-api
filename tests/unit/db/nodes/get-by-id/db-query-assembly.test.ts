import {describe, expect, test} from 'vitest'
import {fetchNodeByIdQuery} from "../../../../../src/db/nodes/fetchNodeById"

describe('database query for fetching a node by ID', () => {
    test('independent of node type', async () => {
        const query = fetchNodeByIdQuery(12_123_456)

        expect(query)
            .toEqual(
                "MATCH (node {mc_id: 12123456})\n" +
                "RETURN node\n" +
                "  LIMIT 1")
    })
})

