import {describe, expect, test} from 'vitest'
import {updateNodeQuery} from "../../../../../src/db/nodes/updateDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

describe('database query for updating a node', () => {
    test('for generic node type', async () => {
        const query = updateNodeQuery(DbNodeType.RacingGame, 12_123_456, {dummy1: 'dummy1', dummy2: 'dummy2'})

        expect(query)
            .toEqual(
                "MATCH (n:RacingGame_A_" + appInstanceId + " {mc_id: 12123456})\n" +
                "SET n += {\n" +
                "  dummy1: 'dummy1',\n" +
                "  dummy2: 'dummy2'\n" +
                "}\n" +
                "RETURN n\n" +
                "  LIMIT 1")
    })
})
