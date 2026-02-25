import {expect, test} from 'vitest'
import {CarModelNode} from "../../../../../src/models/node-types/car-models/types/CarModelNode"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"
import {convertCarModelModelNodeToControllerNode} from "../../../../../src/controllers/node-types/car-models/convertCarModelModelNodeToControllerNode"
import {ControllerNodeType} from "../../../../../src/controllers/types/ControllerNodeType"

test("converting a CAR MODEL node", async () => {
    const node: CarModelNode = {
        node_type: ModelNodeType.CarModel,
        attributes: {
            id: 549,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "360 Modena",
            built_from: 1999,
            built_to: 2005,
            generation: null,
            internal_code: "F131",
            total_production: 16365,
        }
    }

    const convertedNode = convertCarModelModelNodeToControllerNode(node)

    expect(convertedNode)
        .toStrictEqual({
            node_type: ControllerNodeType.CarModel,
            fields: {
                id: 549,
                name: "360 Modena",
                built_from: 1999,
                built_to: 2005,
                generation: null,
                internal_code: "F131",
                total_production: 16365,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            }
        })
})
