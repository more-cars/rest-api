import {expect, test} from 'vitest'
import {Integer, Node} from "neo4j-driver"
import {convertPriceNeo4jNodeToDbNode} from "../../../../../src/db/node-types/prices/convertPriceNeo4jNodeToDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import type {PriceNode} from "../../../../../src/db/node-types/prices/types/PriceNode"

test('the Neo4j node is correctly mapped to a More Cars node', async () => {
    const dbNode: Node = {
        identity: new Integer,
        labels: [],
        properties: {
            mc_id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            price: 59990,
            currency_code: "EUR",
            country_code: "DE",
        },
        elementId: "",
    }

    const mappedNode = convertPriceNeo4jNodeToDbNode(dbNode)

    expect(mappedNode)
        .toStrictEqual({
            node_type: DbNodeType.Price,
            properties: {
                id: 1,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
                price: 59990,
                currency_code: "EUR",
                country_code: "DE",
            },
        } satisfies PriceNode)
})
