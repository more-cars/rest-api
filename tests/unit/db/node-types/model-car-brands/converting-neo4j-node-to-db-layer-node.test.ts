import {expect, test} from 'vitest'
import {Integer, Node} from "neo4j-driver"
import {convertModelCarBrandNeo4jNodeToDbNode} from "../../../../../src/db/node-types/model-car-brands/convertModelCarBrandNeo4jNodeToDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import type {ModelCarBrandNode} from "../../../../../src/db/node-types/model-car-brands/types/ModelCarBrandNode"

test('the Neo4j node is correctly mapped to a More Cars node', async () => {
    const dbNode: Node = {
        identity: new Integer,
        labels: [],
        properties: {
            mc_id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "Hot Wheels",
            founded: 1968,
            defunct: null,
        },
        elementId: "",
    }

    const mappedNode = convertModelCarBrandNeo4jNodeToDbNode(dbNode)

    expect(mappedNode)
        .toStrictEqual({
            node_type: DbNodeType.ModelCarBrand,
            properties: {
                id: 1,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
                name: "Hot Wheels",
                founded: 1968,
                defunct: null,
            },
        } satisfies ModelCarBrandNode)
})
