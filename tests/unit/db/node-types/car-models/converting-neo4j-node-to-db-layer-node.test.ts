import {expect, test} from 'vitest'
import {Integer, Node} from "neo4j-driver"
import {convertCarModelNeo4jNodeToDbNode} from "../../../../../src/db/node-types/car-models/convertCarModelNeo4jNodeToDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import type {CarModelNode} from "../../../../../src/db/node-types/car-models/types/CarModelNode"

test('the Neo4j node is correctly mapped to a More Cars node', async () => {
    const dbNode: Node = {
        identity: new Integer,
        labels: [],
        properties: {
            mc_id: 549,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "360 Modena",
            built_from: 1999,
            built_to: 2005,
            generation: null,
            internal_code: "F131",
            total_production: 16365,
        },
        elementId: "",
    }

    const mappedNode = convertCarModelNeo4jNodeToDbNode(dbNode)

    expect(mappedNode)
        .toStrictEqual({
            node_type: DbNodeType.CarModel,
            properties: {
                id: 549,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
                name: "360 Modena",
                built_from: 1999,
                built_to: 2005,
                generation: null,
                internal_code: "F131",
                total_production: 16365,
            },
        } satisfies CarModelNode)
})
