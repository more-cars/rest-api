import {expect, test} from 'vitest'
import {Integer, Node} from "neo4j-driver"
import {convertLapTimeNeo4jNodeToDbNode} from "../../../../../src/db/node-types/lap-times/convertLapTimeNeo4jNodeToDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import type {LapTimeNode} from "../../../../../src/db/node-types/lap-times/types/LapTimeNode"

test('the Neo4j node is correctly mapped to a More Cars node', async () => {
    const dbNode: Node = {
        identity: new Integer,
        labels: [],
        properties: {
            mc_id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            time: "PT1M33.294S",
            driver_name: "Klaus Ludwig",
            date: "1996-08-03",
        },
        elementId: "",
    }

    const mappedNode = convertLapTimeNeo4jNodeToDbNode(dbNode)

    expect(mappedNode)
        .toStrictEqual({
            node_type: DbNodeType.LapTime,
            properties: {
                id: 1,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
                time: "PT1M33.294S",
                driver_name: "Klaus Ludwig",
                date: "1996-08-03",
            },
        } satisfies LapTimeNode)
})
