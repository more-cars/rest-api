import {expect, test} from 'vitest'
import {CarModelNode} from "../../../../../../src/models/car-models/types/CarModelNode"
import {marshalNode} from "../../../../../../src/controllers/carModels/marshalling/marshalNode"

test("marshalling a CAR MODEL node", async () => {
    const node: CarModelNode = {
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

    const marshalledNode = marshalNode(node)

    expect(marshalledNode)
        .toStrictEqual({
            data: {
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
