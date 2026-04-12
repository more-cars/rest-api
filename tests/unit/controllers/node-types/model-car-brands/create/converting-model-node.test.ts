import {expect, test} from 'vitest'
import {ModelCarBrandNode} from "../../../../../../src/models/node-types/model-car-brands/types/ModelCarBrandNode"
import {ModelNodeType} from "../../../../../../src/models/types/ModelNodeType"
import {convertModelCarBrandModelNodeToControllerNode} from "../../../../../../src/controllers/node-types/model-car-brands/convertModelCarBrandModelNodeToControllerNode"
import {ControllerNodeType} from "../../../../../../src/controllers/types/ControllerNodeType"

test("converting a MODEL CAR BRAND node", async () => {
    const node: ModelCarBrandNode = {
        node_type: ModelNodeType.ModelCarBrand,
        attributes: {
            id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "Hot Wheels",
            founded: 1968,
            defunct: null,
            country_code: 'US',
        },
    }

    const convertedNode = convertModelCarBrandModelNodeToControllerNode(node)

    expect(convertedNode)
        .toStrictEqual({
            node_type: ControllerNodeType.ModelCarBrand,
            fields: {
                id: 1,
                name: "Hot Wheels",
                founded: 1968,
                defunct: null,
                country_code: 'US',
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            },
        })
})
