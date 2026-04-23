import {expect, test} from 'vitest'
import {InputGamingPlatformCreate} from "../../../../../src/db/node-types/gaming-platforms/types/InputGamingPlatformCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('single quotes are correctly escaped', async () => {
    const data: InputGamingPlatformCreate = {
        name: "'PlayStation 5",
        release_year: null,
        manufacturer: "'Sony"
    }

    const query = createNodeQuery(DbNodeType.GamingPlatform, data, "2025-05-14T11:05:07.793Z")

    expect(query)
        .toEqual(
            "CREATE (n:GamingPlatform_A_" + appInstanceId + " {\n" +
            "  name: '\\'PlayStation 5',\n" +
            "  release_year: null,\n" +
            "  manufacturer: '\\'Sony',\n" +
            "  created_at: '2025-05-14T11:05:07.793Z',\n" +
            "  updated_at: '2025-05-14T11:05:07.793Z'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
