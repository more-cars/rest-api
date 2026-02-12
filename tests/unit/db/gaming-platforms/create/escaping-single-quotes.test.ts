import {expect, test} from 'vitest'
import {InputGamingPlatformCreate} from "../../../../../src/db/nodes/gaming-platforms/types/InputGamingPlatformCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/gaming-platforms/createNode"

test('single quotes are correctly escaped', async () => {
    const data: InputGamingPlatformCreate = {
        name: "'PlayStation 5",
        release_year: null,
        manufacturer: "'Sony"
    }

    const query = createNodeQuery(data)

    expect(query)
        .toEqual(
            "CREATE (node:GamingPlatform {\n" +
            "  name: '\\'PlayStation 5',\n" +
            "  release_year: null,\n" +
            "  manufacturer: '\\'Sony'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
