import {expect, test} from 'vitest'
import {MagazineNode} from "../../../../../src/models/node-types/magazines/types/MagazineNode"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"
import {convertMagazineModelNodeToControllerNode} from "../../../../../src/controllers/node-types/magazines/convertMagazineModelNodeToControllerNode"
import {ControllerNodeType} from "../../../../../src/controllers/types/ControllerNodeType"

test("converting a MAGAZINE node", async () => {
    const node: MagazineNode = {
        node_type: ModelNodeType.Magazine,
        attributes: {
            id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "Top Gear",
            founded: 1993,
            defunct: null,
            focus: "sports cars",
            publication_frequency: "monthly",
            single_copy_price: 5.99,
            single_copy_price_unit: "£",
            publication_format: "print",
            circulation: 150884,
            circulation_year: 2013,
            publisher: "Immediate Media Company",
            issn: "1350-9624",
        },
    }

    const convertedNode = convertMagazineModelNodeToControllerNode(node)

    expect(convertedNode)
        .toStrictEqual({
            node_type: ControllerNodeType.Magazine,
            fields: {
                id: 1,
                name: "Top Gear",
                founded: 1993,
                defunct: null,
                focus: "sports cars",
                publication_frequency: "monthly",
                single_copy_price: 5.99,
                single_copy_price_unit: "£",
                publication_format: "print",
                circulation: 150884,
                circulation_year: 2013,
                publisher: "Immediate Media Company",
                issn: "1350-9624",
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            },
        })
})
