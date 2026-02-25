import {expect, test} from 'vitest'
import {BrandNode} from "../../../../../src/models/node-types/brands/types/BrandNode"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"
import {convertBrandModelNodeToControllerNode} from "../../../../../src/controllers/node-types/brands/convertBrandModelNodeToControllerNode"
import {ControllerNodeType} from "../../../../../src/controllers/types/ControllerNodeType"

test("converting a BRAND node", async () => {
    const node: BrandNode = {
        node_type: ModelNodeType.Brand,
        attributes: {
            id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "BMW",
            full_name: "Bayerische Motoren Werke",
            founded: 1916,
            defunct: null,
            wmi: "WBA",
            hsn: "0005",
        }
    }

    const convertedNode = convertBrandModelNodeToControllerNode(node)

    expect(convertedNode)
        .toStrictEqual({
            node_type: ControllerNodeType.Brand,
            fields: {
                id: 1,
                name: "BMW",
                full_name: "Bayerische Motoren Werke",
                founded: 1916,
                defunct: null,
                wmi: "WBA",
                hsn: "0005",
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            }
        })
})
