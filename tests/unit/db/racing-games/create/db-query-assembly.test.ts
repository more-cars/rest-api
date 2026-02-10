import {expect, test} from 'vitest'
import {createNodeQuery} from "../../../../../src/db/nodes/racing-games/createNode"
import {InputRacingGameCreate} from "../../../../../src/db/nodes/racing-games/types/InputRacingGameCreate"

test('database query for creating a RACING GAME node', async () => {
    const data: InputRacingGameCreate = {
        name: "Forza Motorsport 7",
        release_year: 2017,
        developer: "Turn 10 Studios",
        publisher: "Microsoft Studios"
    }

    const query = createNodeQuery(data)

    expect(query)
        .toEqual(
            "CREATE (node:RacingGame {\n" +
            "  name: 'Forza Motorsport 7',\n" +
            "  release_year: 2017,\n" +
            "  developer: 'Turn 10 Studios',\n" +
            "  publisher: 'Microsoft Studios'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
