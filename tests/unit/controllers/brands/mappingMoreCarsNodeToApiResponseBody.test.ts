import {BrandNode} from "../../../../src/types/brands/BrandNode"
import {marshal} from "../../../../src/controllers/brands/marshal"

test('the More Cars node is correctly mapped to an API response body', async () => {
    const node: BrandNode = {
        id: 1,
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
        name: "BMW",
        full_name: "Bayerische Motoren Werke",
        founded: 1916,
        defunct: undefined,
        // wmi: "WBA", // field is intentionally omitted
        hsn: "0005",
    }

    const mappedNode = marshal(node)

    expect(mappedNode)
        .toStrictEqual({
            id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "BMW",
            full_name: "Bayerische Motoren Werke",
            founded: 1916,
            defunct: null,
            wmi: null,
            hsn: "0005",
        })
})
