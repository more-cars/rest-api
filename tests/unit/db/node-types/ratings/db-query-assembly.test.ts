import {expect, test} from 'vitest'
import {InputRatingCreate} from "../../../../../src/db/node-types/ratings/types/InputRatingCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a RATING node', async () => {
    const data: InputRatingCreate = {
        rating_value: 93,
        scale_minimum: 0,
        scale_maximum: 100,
        scale_direction: "up"
    }

    const query = createNodeQuery(DbNodeType.Rating, data)

    expect(query)
        .toEqual(
            "CREATE (node:Rating_" + appInstanceId + " {\n" +
            "  rating_value: 93,\n" +
            "  scale_minimum: 0,\n" +
            "  scale_maximum: 100,\n" +
            "  scale_direction: 'up'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
