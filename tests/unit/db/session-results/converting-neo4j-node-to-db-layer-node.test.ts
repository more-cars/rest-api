import {expect, test} from 'vitest'
import {Integer, Node} from "neo4j-driver"
import {convertSessionResultNeo4jNodeToDbNode} from "../../../../src/db/node-types/session-results/convertSessionResultNeo4jNodeToDbNode"
import {DbNodeType} from "../../../../src/db/types/DbNodeType"
import type {SessionResultNode} from "../../../../src/db/node-types/session-results/types/SessionResultNode"

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
        elementId: "",
    }

    const mappedNode = convertSessionResultNeo4jNodeToDbNode(dbNode)

    expect(mappedNode)
        .toStrictEqual({
            node_type: DbNodeType.SessionResult,
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
            },
        } satisfies SessionResultNode)
})
