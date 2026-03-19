import {expect, test} from 'vitest'
import {Integer, Node} from "neo4j-driver"
import {convertModelCarNeo4jNodeToDbNode} from "../../../../../src/db/node-types/model-cars/convertModelCarNeo4jNodeToDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import type {ModelCarNode} from "../../../../../src/db/node-types/model-cars/types/ModelCarNode"

test('the Neo4j node is correctly mapped to a More Cars node', async () => {
    const dbNode: Node = {
        identity: new Integer,
        labels: [],
        properties: {
            mc_id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "BMW 2002",
            product_code: "DHX60",
            release_year: 2016,
            scale: "1:64",
            series: "BMW",
        },
        elementId: "",
    }

    const mappedNode = convertModelCarNeo4jNodeToDbNode(dbNode)

    expect(mappedNode)
        .toStrictEqual({
            node_type: DbNodeType.ModelCar,
            properties: {
                id: 1,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
                name: "BMW 2002",
                product_code: "DHX60",
                release_year: 2016,
                scale: "1:64",
                series: "BMW",
            },
        } satisfies ModelCarNode)
})
