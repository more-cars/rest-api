import {describe, expect, test} from 'vitest'
import {deleteNodeQuery} from '../../../../../src/db/nodes/deleteNode'

describe('database query for deleting a node by ID', () => {
    test('unrestricted node type', async () => {
        const query = deleteNodeQuery(12_123_456)

        expect(query)
            .toEqual(
                "MATCH (node {mc_id: 12123456})\n" +
                "DETACH DELETE node")
    })
})

