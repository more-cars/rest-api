import {expect, test} from 'vitest'
import {CompanyNode} from "../../../../../../src/models/companies/types/CompanyNode"
import {marshalNode} from "../../../../../../src/controllers/companies/marshalling/marshalNode"

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

    const mappedNode = marshalNode(node)

    expect(mappedNode)
        .toStrictEqual({
            data: {
                id: 1,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
                name: "BMW AG",
                founded: 1916,
                defunct: null,
                headquarters_location: "Munich",
                legal_headquarters_location: "Munich",
            }
        })
})
