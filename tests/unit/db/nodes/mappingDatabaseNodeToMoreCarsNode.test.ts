import {expect, test} from 'vitest'
import {Integer, Node} from "neo4j-driver"
import {mapDbNodeToModelNode} from "../../../../src/db/nodes/mapDbNodeToModelNode"

test('the Neo4j node is correctly mapped to a More Cars node', async () => {
    const dbNode: Node = {
        identity: new Integer,
        labels: [],
        properties: {
            mc_id: 987654,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
        },
        elementId: ""
    }

    const mappedNode = mapDbNodeToModelNode(dbNode)

    expect(mappedNode)
        .toStrictEqual({
            id: 987654,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
        })
})
