import {expect, test} from 'vitest'
import {Integer, Node} from "neo4j-driver"
import {convertMotorShowNeo4jNodeToDbNode} from "../../../../../src/db/node-types/motor-shows/convertMotorShowNeo4jNodeToDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import type {MotorShowNode} from "../../../../../src/db/node-types/motor-shows/types/MotorShowNode"

test('the Neo4j node is correctly mapped to a More Cars node', async () => {
    const dbNode: Node = {
        identity: new Integer,
        labels: [],
        properties: {
            mc_id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "2017 IAA Frankfurt",
            date_from: "2017-09-14",
            date_until: "2017-09-24",
            location: "Frankfurt",
            target_audience: "international",
            focus: "new cars",
            country_code: "DE",
        },
        elementId: "",
    }

    const mappedNode = convertMotorShowNeo4jNodeToDbNode(dbNode)

    expect(mappedNode)
        .toStrictEqual({
            node_type: DbNodeType.MotorShow,
            properties: {
                id: 1,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
                name: "2017 IAA Frankfurt",
                date_from: "2017-09-14",
                date_until: "2017-09-24",
                location: "Frankfurt",
                target_audience: "international",
                focus: "new cars",
                country_code: "DE",
            },
        } satisfies MotorShowNode)
})
