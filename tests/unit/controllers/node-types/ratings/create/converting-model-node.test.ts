import {expect, test} from 'vitest'
import {RatingNode} from "../../../../../../src/models/node-types/ratings/types/RatingNode"
import {ModelNodeType} from "../../../../../../src/models/types/ModelNodeType"
import {convertRatingModelNodeToControllerNode} from "../../../../../../src/controllers/node-types/ratings/convertRatingModelNodeToControllerNode"
import {ControllerNodeType} from "../../../../../../src/controllers/types/ControllerNodeType"

test("converting a RATING node", async () => {
    const node: RatingNode = {
        node_type: ModelNodeType.Rating,
        attributes: {
            id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            rating_value: 93,
            scale_minimum: 0,
            scale_maximum: 100,
            scale_direction: "up",
        },
    }

    const convertedNode = convertRatingModelNodeToControllerNode(node)

    expect(convertedNode)
        .toStrictEqual({
            node_type: ControllerNodeType.Rating,
            fields: {
                id: 1,
                rating_value: 93,
                scale_minimum: 0,
                scale_maximum: 100,
                scale_direction: "up",
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            },
        })
})
