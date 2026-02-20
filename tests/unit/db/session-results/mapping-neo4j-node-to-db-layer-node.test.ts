import {expect, test} from 'vitest'
import {Integer, Node} from "neo4j-driver"
import {mapDbNodeToSessionResultNode} from "../../../../src/db/nodes/session-results/mapDbNodeToSessionResultNode"

test('the Neo4j node is correctly mapped to a More Cars node', async () => {
    const dbNode: Node = {
        identity: new Integer,
        labels: [],
        properties: {
            mc_id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            position: 1,
            race_number: "44",
            driver_name: "Lewis Hamilton",
            team_name: "Mercedes",
            race_time: "PT1H23M45.678S",
            laps: 51,
            status: "finished",
            points: 25,
        },
        elementId: ""
    }

    const mappedNode = mapDbNodeToSessionResultNode(dbNode)

    expect(mappedNode)
        .toStrictEqual({
            node_type: "SessionResult",
            properties: {
                id: 1,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
                position: 1,
                race_number: "44",
                driver_name: "Lewis Hamilton",
                team_name: "Mercedes",
                race_time: "PT1H23M45.678S",
                laps: 51,
                status: "finished",
                points: 25,
            }
        })
})
