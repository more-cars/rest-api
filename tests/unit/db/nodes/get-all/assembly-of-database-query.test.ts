import {describe, expect, test} from 'vitest'
import {getAllNodeTypes} from "../../../../_toolbox/getAllNodeTypes"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"
import {getAllNodesOfTypeQuery} from "../../../../../src/db/nodes/getAllNodesOfTypeQuery"

describe('assembly of the database query for a "get all nodes" request', () => {
    test('plain request', async () => {
        getAllNodeTypes().forEach((nodeType: NodeTypeLabel) => {
            const query = getAllNodesOfTypeQuery(nodeType)

            expect(query)
                .toEqual(
                    "MATCH (node:" + nodeType + ")\n" +
                    "RETURN node\n" +
                    "  ORDER BY node.mc_id\n" +
                    "  SKIP 0\n" +
                    "  LIMIT 100")
        })
    })

    test('pagination request', async () => {
        getAllNodeTypes().forEach((nodeType: NodeTypeLabel) => {
            const query = getAllNodesOfTypeQuery(nodeType, {limit: 30, offset: 7})

            expect(query)
                .toEqual(
                    "MATCH (node:" + nodeType + ")\n" +
                    "RETURN node\n" +
                    "  ORDER BY node.mc_id\n" +
                    "  SKIP 7\n" +
                    "  LIMIT 30")
        })
    })
})
