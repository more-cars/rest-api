import {expect, test} from 'vitest'
import {GamingPlatformNode} from "../../../../../src/models/node-types/gaming-platforms/types/GamingPlatformNode"
import {marshalNode} from "../../../../../src/controllers/node-types/gaming-platforms/marshalling/marshalNode"

test("marshalling a GAMING PLATFORM node", async () => {
    const node: GamingPlatformNode = {
        id: 1,
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
        name: "PlayStation 5",
        release_year: 2020,
        manufacturer: "Sony",
    }

    const marshalledNode = marshalNode(node)

    expect(marshalledNode)
        .toStrictEqual({
            data: {
                id: 1,
                name: "PlayStation 5",
                release_year: 2020,
                manufacturer: "Sony",
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            }
        })
})
