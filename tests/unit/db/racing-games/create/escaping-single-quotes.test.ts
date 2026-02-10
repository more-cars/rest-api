import {expect, test} from 'vitest'
import {InputRacingGameCreate} from "../../../../../src/db/nodes/racing-games/types/InputRacingGameCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/racing-games/createNode"

test('single quotes are correctly escaped', async () => {
    const data: InputRacingGameCreate = {
        name: "'Forza Motorsport 7",
        release_year: null,
        developer: "'Turn 10 Studios",
        publisher: "'Microsoft Studios"
    }

    const query = createNodeQuery(data)

    expect(query)
        .toEqual(
            "CREATE (node:RacingGame {\n" +
            "  name: '\\'Forza Motorsport 7',\n" +
            "  release_year: null,\n" +
            "  developer: '\\'Turn 10 Studios',\n" +
            "  publisher: '\\'Microsoft Studios'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
