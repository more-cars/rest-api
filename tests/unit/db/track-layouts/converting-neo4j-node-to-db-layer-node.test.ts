import {expect, test} from 'vitest'
import {Integer, Node} from "neo4j-driver"
import {convertTrackLayoutNeo4jNodeToDbNode} from "../../../../src/db/node-types/track-layouts/convertTrackLayoutNeo4jNodeToDbNode"

test('the Neo4j node is correctly mapped to a More Cars node', async () => {
    const dbNode: Node = {
        identity: new Integer,
        labels: [],
        properties: {
            mc_id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "GP Circuit",
            year_from: 1967,
            year_to: 1999,
            length: 7.004,
            length_unit: "km",
            direction: "clockwise",
            elevation_change: 71,
            elevation_change_unit: "m",
            surface: "asphalt",
        },
        elementId: "",
    }

    const mappedNode = convertTrackLayoutNeo4jNodeToDbNode(dbNode)

    expect(mappedNode)
        .toStrictEqual({
            node_type: "TrackLayout",
            properties: {
                id: 1,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
                name: "GP Circuit",
                year_from: 1967,
                year_to: 1999,
                length: 7.004,
                length_unit: "km",
                direction: "clockwise",
                elevation_change: 71,
                elevation_change_unit: "m",
                surface: "asphalt",
            },
        })
})
