import {expect, test} from 'vitest'
import {BrandNode} from "../../../../../../src/models/brands/types/BrandNode"
import {marshalAll} from "../../../../../../src/controllers/brands/marshalAll"

test('marshalling a complete and valid request', async () => {
    const nodes: Array<BrandNode> = [
        {
            id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "Porsche",
            full_name: null,
            founded: 1931,
            defunct: null,
            wmi: "WP0",
            hsn: "0583",
        },
        {
            id: 2,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "Oldsmobile",
            full_name: null,
            founded: 1897,
            defunct: 2004,
            wmi: "2G3",
            hsn: null,
        },
        {
            id: 3,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "BMW",
            full_name: "Bayerische Motoren Werke",
            founded: 1916,
            defunct: null,
            wmi: "WBA",
            hsn: "0005",
        },
    ]

    const mappedNodes = marshalAll(nodes)

    expect(mappedNodes)
        .toStrictEqual([
            {
                id: 1,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
                name: "Porsche",
                full_name: null,
                founded: 1931,
                defunct: null,
                wmi: "WP0",
                hsn: "0583",
            },
            {
                id: 2,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
                name: "Oldsmobile",
                full_name: null,
                founded: 1897,
                defunct: 2004,
                wmi: "2G3",
                hsn: null,
            },
            {
                id: 3,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
                name: "BMW",
                full_name: "Bayerische Motoren Werke",
                founded: 1916,
                defunct: null,
                wmi: "WBA",
                hsn: "0005",
            },
        ])
})
