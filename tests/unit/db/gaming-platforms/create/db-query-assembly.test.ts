import {expect, test} from 'vitest'
import {InputGamingPlatformCreate} from "../../../../../src/db/nodes/gaming-platforms/types/InputGamingPlatformCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createDbNode"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"

test('database query for creating a GAMING PLATFORM node', async () => {
    const data: InputGamingPlatformCreate = {
        name: "PlayStation 5",
        release_year: 2020,
        manufacturer: "Sony"
    }

    const query = createNodeQuery(NodeTypeLabel.GamingPlatform, data)

    expect(query)
        .toEqual(
            "CREATE (node:GamingPlatform {\n" +
            "  name: 'PlayStation 5',\n" +
            "  release_year: 2020,\n" +
            "  manufacturer: 'Sony'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
