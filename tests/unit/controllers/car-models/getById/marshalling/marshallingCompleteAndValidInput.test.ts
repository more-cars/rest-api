import {expect, test} from 'vitest'
import type {CarModelNode} from "../../../../../../src/models/car-models/types/CarModelNode"
import {marshal} from "../../../../../../src/controllers/carModels/marshal"

test('marshalling a complete and valid request', async () => {
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

    const mappedNode = marshal(node)

    expect(mappedNode)
        .toStrictEqual({
            id: 549,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "360 Modena",
            built_from: 1999,
            built_to: 2005,
            generation: null,
            internal_code: "F131",
            total_production: 16365,
        })
})
