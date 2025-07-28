import {expect, test} from 'vitest'
import {marshalAll} from "../../../../../../src/controllers/carModels/marshalAll"
import {CarModelNode} from "../../../../../../src/models/car-models/types/CarModelNode"

/**
 * @group happyPath
 */
test('marshalling a complete and valid request', async () => {
    const nodes: Array<CarModelNode> = [
        {
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
        {
            id: 960,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "911",
            built_from: 1964,
            built_to: 1972,
            generation: 1,
            internal_code: "F series",
            total_production: 81032,
        },
        {
            id: 504,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "Materia",
            built_from: null,
            built_to: null,
            generation: null,
            internal_code: null,
            total_production: null,
        },
    ]

    const mappedNodes = marshalAll(nodes)

    expect(mappedNodes)
        .toStrictEqual([
            {
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
            {
                id: 960,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
                name: "911",
                built_from: 1964,
                built_to: 1972,
                generation: 1,
                internal_code: "F series",
                total_production: 81032,
            },
            {
                id: 504,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
                name: "Materia",
                built_from: null,
                built_to: null,
                generation: null,
                internal_code: null,
                total_production: null,
            },
        ])
})
