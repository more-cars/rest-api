import {expect, test} from 'vitest'
import {GamingPlatformNode} from "../../../../../src/models/node-types/gaming-platforms/types/GamingPlatformNode"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"
import {convertGamingPlatformNodeToControllerNode} from "../../../../../src/controllers/node-types/gaming-platforms/convertGamingPlatformNodeToControllerNode"
import {ControllerNodeType} from "../../../../../src/controllers/types/ControllerNodeType"

test("converting a GAMING PLATFORM node", async () => {
    const node: GamingPlatformNode = {
        node_type: ModelNodeType.GamingPlatform,
        attributes: {
            id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "PlayStation 5",
            release_year: 2020,
            manufacturer: "Sony",
        }
    }

    const convertedNode = convertGamingPlatformNodeToControllerNode(node)

    expect(convertedNode)
        .toStrictEqual({
            node_type: ControllerNodeType.GamingPlatform,
            fields: {
                id: 1,
                name: "PlayStation 5",
                release_year: 2020,
                manufacturer: "Sony",
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            }
        })
})
