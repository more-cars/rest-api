import {Integer, Node} from "neo4j-driver"
import {mapDbNodeToModelNode} from "../../../../src/db/car-models/mapDbNodeToModelNode"

test('the Neo4j node is correctly mapped to a More Cars node', async () => {
    const dbNode: Node = {
        identity: new Integer,
        labels: [],
        properties: {
            mc_id: 549,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            built_from: 1999,
            built_to: 2005,
            generation: null,
            internal_code: "F131",
            total_production: 16365,
        },
        elementId: ""
    }

    const mappedNode = mapDbNodeToModelNode(dbNode)

    expect(mappedNode)
        .toEqual({
            id: 549,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            built_from: 1999,
            built_to: 2005,
            generation: null,
            internal_code: "F131",
            total_production: 16365,
        })
})
