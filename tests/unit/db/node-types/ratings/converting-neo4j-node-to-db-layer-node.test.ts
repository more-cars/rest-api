import {expect, test} from 'vitest'
import {Integer, Node} from "neo4j-driver"
import {convertRatingNeo4jNodeToDbNode} from "../../../../../src/db/node-types/ratings/convertRatingNeo4jNodeToDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import type {RatingNode} from "../../../../../src/db/node-types/ratings/types/RatingNode"

test('the Neo4j node is correctly mapped to a More Cars node', async () => {
    const dbNode: Node = {
        identity: new Integer,
        labels: [],
        properties: {
            mc_id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            rating_value: 93,
            scale_minimum: 0,
            scale_maximum: 100,
            scale_direction: "up",
        },
        elementId: "",
    }

    const mappedNode = convertRatingNeo4jNodeToDbNode(dbNode)

    expect(mappedNode)
        .toStrictEqual({
            node_type: DbNodeType.Rating,
            properties: {
                id: 1,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
                rating_value: 93,
                scale_minimum: 0,
                scale_maximum: 100,
                scale_direction: "up",
            },
        } satisfies RatingNode)
})
