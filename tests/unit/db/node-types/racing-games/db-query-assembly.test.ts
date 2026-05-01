import {expect, test} from 'vitest'
import type {QueryInputData} from "../../../../../src/db/types/QueryInputData"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a RACING GAME node', async () => {
    const data: QueryInputData = {
        name: "Forza Motorsport 7",
        release_year: 2017,
        developer: "Turn 10 Studios",
        publisher: "Microsoft Studios",
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
    }

    const query = createNodeQuery(DbNodeType.RacingGame, data)

    expect(query)
        .toEqual(
            "CREATE (n:RacingGame_A_" + appInstanceId + " {\n" +
            "  name: 'Forza Motorsport 7',\n" +
            "  release_year: 2017,\n" +
            "  developer: 'Turn 10 Studios',\n" +
            "  publisher: 'Microsoft Studios',\n" +
            "  created_at: '2025-05-14T11:05:07.793Z',\n" +
            "  updated_at: '2025-05-14T11:05:07.793Z'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
