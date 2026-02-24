import {expect, test} from 'vitest'
import {Integer, Node} from "neo4j-driver"
import {convertGamingPlatformNeo4jNodeToDbNode} from "../../../../src/db/node-types/gaming-platforms/convertGamingPlatformNeo4jNodeToDbNode"

test('the Neo4j node is correctly mapped to a More Cars node', async () => {
    const dbNode: Node = {
        identity: new Integer,
        labels: [],
        properties: {
            mc_id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "PlayStation 5",
            release_year: 2020,
            manufacturer: "Sony",
        },
        elementId: "",
    }

    const mappedNode = convertGamingPlatformNeo4jNodeToDbNode(dbNode)

    expect(mappedNode)
        .toStrictEqual({
            node_type: "GamingPlatform",
            properties: {
                id: 1,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
                name: "PlayStation 5",
                release_year: 2020,
                manufacturer: "Sony",
            },
        })
})
