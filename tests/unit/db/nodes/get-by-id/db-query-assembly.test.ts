import {describe, expect, test} from 'vitest'
import {getAllNodeTypes} from "../../../../_toolbox/getAllNodeTypes"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"
import {getNodeByIdQuery} from "../../../../../src/db/nodes/getNodeById"

describe('database query for fetching a node by ID', () => {
    test('independent of node type', async () => {
        const query = getNodeByIdQuery(12_123_456)

        expect(query)
            .toEqual(
                "MATCH (node {mc_id: 12123456})\n" +
                "RETURN node\n" +
                "  LIMIT 1")
    })

    test('restricted to specific node type', async () => {
        getAllNodeTypes().forEach((nodeType: NodeTypeLabel) => {
            const nodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
            const query = getNodeByIdQuery(nodeId, nodeType)

            expect(query)
                .toEqual(
                    "MATCH (node:" + nodeType + " {mc_id: " + nodeId + "})\n" +
                    "RETURN node\n" +
                    "  LIMIT 1")
        })
    })
})

