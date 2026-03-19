import {expect, test} from 'vitest'
import {PriceNode} from "../../../../../../src/models/node-types/prices/types/PriceNode"
import {ModelNodeType} from "../../../../../../src/models/types/ModelNodeType"
import {convertPriceModelNodeToControllerNode} from "../../../../../../src/controllers/node-types/prices/convertPriceModelNodeToControllerNode"
import {ControllerNodeType} from "../../../../../../src/controllers/types/ControllerNodeType"

test("converting a PRICE node", async () => {
    const node: PriceNode = {
        node_type: ModelNodeType.Price,
        attributes: {
            id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            price: 59990,
            currency_code: "EUR",
            country_code: "DE",
        },
    }

    const convertedNode = convertPriceModelNodeToControllerNode(node)

    expect(convertedNode)
        .toStrictEqual({
            node_type: ControllerNodeType.Price,
            fields: {
                id: 1,
                price: 59990,
                currency_code: "EUR",
                country_code: "DE",
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            },
        })
})
