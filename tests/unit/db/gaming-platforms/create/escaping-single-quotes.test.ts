import {expect, test} from 'vitest'
import {InputGamingPlatformCreate} from "../../../../../src/db/nodes/gaming-platforms/types/InputGamingPlatformCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createDbNode"
import {Neo4jNodeType} from "../../../../../src/db/types/Neo4jNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('single quotes are correctly escaped', async () => {
    const data: InputGamingPlatformCreate = {
        name: "'PlayStation 5",
        release_year: null,
        manufacturer: "'Sony"
    }

    const query = createNodeQuery(Neo4jNodeType.GamingPlatform, data)

    expect(query)
        .toEqual(
            "CREATE (node:GamingPlatform_" + appInstanceId + " {\n" +
            "  name: '\\'PlayStation 5',\n" +
            "  release_year: null,\n" +
            "  manufacturer: '\\'Sony'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
