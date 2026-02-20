import {expect, test} from 'vitest'
import {Integer, Node} from "neo4j-driver"
import {mapDbNodeToRacingSeriesNode} from "../../../../src/db/nodes/racing-series/mapDbNodeToRacingSeriesNode"

test('the Neo4j node is correctly mapped to a More Cars node', async () => {
    const dbNode: Node = {
        identity: new Integer,
        labels: [],
        properties: {
            mc_id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "Formula 1",
            short_name: "F1",
            founded: 1950,
            defunct: null,
            organized_by: "FIA",
            vehicle_type: "formula racing cars",
        },
        elementId: ""
    }

    const mappedNode = mapDbNodeToRacingSeriesNode(dbNode)

    expect(mappedNode)
        .toStrictEqual({
            node_type: "RacingSeries",
            properties: {
                id: 1,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
                name: "Formula 1",
                short_name: "F1",
                founded: 1950,
                defunct: null,
                organized_by: "FIA",
                vehicle_type: "formula racing cars",
            }
        })
})
