import {expect, test} from 'vitest'
import {ModelCarNode} from "../../../../../../src/models/node-types/model-cars/types/ModelCarNode"
import {ModelNodeType} from "../../../../../../src/models/types/ModelNodeType"
import {convertModelCarModelNodeToControllerNode} from "../../../../../../src/controllers/node-types/model-cars/convertModelCarModelNodeToControllerNode"
import {ControllerNodeType} from "../../../../../../src/controllers/types/ControllerNodeType"

test("converting a MODEL CAR node", async () => {
    const node: ModelCarNode = {
        node_type: ModelNodeType.ModelCar,
        attributes: {
            id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "BMW 2002",
            product_code: "DHX60",
            release_year: 2016,
            scale: "1:64",
            series: "BMW",
        },
    }

    const convertedNode = convertModelCarModelNodeToControllerNode(node)

    expect(convertedNode)
        .toStrictEqual({
            node_type: ControllerNodeType.ModelCar,
            fields: {
                id: 1,
                name: "BMW 2002",
                product_code: "DHX60",
                release_year: 2016,
                scale: "1:64",
                series: "BMW",
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            },
        })
})
