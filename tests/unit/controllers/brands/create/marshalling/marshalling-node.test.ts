import {expect, test} from 'vitest'
import {BrandNode} from "../../../../../../src/models/brands/types/BrandNode"
import {marshalNode} from "../../../../../../src/controllers/brands/marshalling/marshalNode"

test("marshalling a BRAND node", async () => {
    const node: BrandNode = {
        id: 1,
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
        name: "BMW",
        full_name: "Bayerische Motoren Werke",
        founded: 1916,
        defunct: null,
        wmi: "WBA",
        hsn: "0005",
    }

    const marshalledNode = marshalNode(node)

    expect(marshalledNode)
        .toStrictEqual({
            data: {
                id: 1,
                name: "BMW",
                full_name: "Bayerische Motoren Werke",
                founded: 1916,
                defunct: null,
                wmi: "WBA",
                hsn: "0005",
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            }
        })
})
