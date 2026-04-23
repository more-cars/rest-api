import {expect, test} from 'vitest'
import {InputRacingGameCreate} from "../../../../../src/db/node-types/racing-games/types/InputRacingGameCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a RACING GAME node', async () => {
    const data: InputRacingGameCreate = {
        name: "Forza Motorsport 7",
        release_year: 2017,
        developer: "Turn 10 Studios",
        publisher: "Microsoft Studios"
    }

    const query = createNodeQuery(DbNodeType.RacingGame, data, "2025-05-14T11:05:07.793Z")

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
