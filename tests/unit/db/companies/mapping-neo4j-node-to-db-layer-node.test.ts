import {expect, test} from 'vitest'
import {Integer, Node} from "neo4j-driver"
import {mapDbNodeToCompanyNode} from "../../../../src/db/nodes/companies/mapDbNodeToCompanyNode"

test('the Neo4j node is correctly mapped to a More Cars node', async () => {
    const dbNode: Node = {
        identity: new Integer,
        labels: [],
        properties: {
            mc_id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "BMW AG",
            founded: 1916,
            defunct: null,
            headquarters_location: "Munich",
            legal_headquarters_location: "Munich",
        },
        elementId: ""
    }

    const mappedNode = mapDbNodeToCompanyNode(dbNode)

    expect(mappedNode)
        .toStrictEqual({
            node_type: "Company",
            properties: {
                id: 1,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
                name: "BMW AG",
                founded: 1916,
                defunct: null,
                headquarters_location: "Munich",
                legal_headquarters_location: "Munich",
            }
        })
})
