import {expect, test} from 'vitest'
import {createNodeQuery} from "../../../../../src/db/nodes/racing-events/createNode"
import {InputRacingEventCreate} from "../../../../../src/db/nodes/racing-events/types/InputRacingEventCreate"

test('database query for creating a RACING EVENT node', async () => {
    const data: InputRacingEventCreate = {
        name: "GP Monaco 2025",
        round: 8,
        date_from: "2025-05-25",
        date_to: "2025-05-27"
    }

    const query = createNodeQuery(data)

    expect(query)
        .toEqual(
            "CREATE (node:RacingEvent {\n" +
            "  name: 'GP Monaco 2025',\n" +
            "  round: 8,\n" +
            "  date_from: '2025-05-25',\n" +
            "  date_to: '2025-05-27'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
