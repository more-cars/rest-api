import {CarModelNode} from "../../../../src/types/car-models/CarModelNode"
import {marshal} from "../../../../src/controllers/carModels/marshal"

test('the More Cars node is correctly mapped to an API response body', async () => {
    const node: CarModelNode = {
        id: 549,
        name: "360 Modena",
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
        built_from: 1999,
        // built_to: 2005, // field is intentionally omitted
        generation: undefined,
        internal_code: "F131",
        total_production: 16365
    }

    const mappedNode = marshal(node)

    expect(mappedNode)
        .toStrictEqual({
            id: 549,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "360 Modena",
            built_from: 1999,
            built_to: null,
            generation: null,
            internal_code: "F131",
            total_production: 16365,
        })
})
