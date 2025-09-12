import {expect, test} from 'vitest'
import {CompanyNode} from "../../../../../../src/models/companies/types/CompanyNode"
import {marshal} from "../../../../../../src/controllers/companies/marshal"

test('marshalling a complete and valid request', async () => {
    const node: CompanyNode = {
        id: 1,
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
        name: "BMW AG",
        founded: 1916,
        defunct: null,
        headquarters_location: "Munich",
        legal_headquarters_location: "Munich",
    }

    const mappedNode = marshal(node)

    expect(mappedNode)
        .toStrictEqual({
            id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "BMW AG",
            founded: 1916,
            defunct: null,
            headquarters_location: "Munich",
            legal_headquarters_location: "Munich",
        })
})
