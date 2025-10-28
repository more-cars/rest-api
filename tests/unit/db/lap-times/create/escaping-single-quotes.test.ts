import {expect, test} from 'vitest'
import {InputLapTimeCreate} from "../../../../../src/db/nodes/lap-times/types/InputLapTimeCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/lap-times/createNode"

test('single quotes are correctly escaped', async () => {
    const data: InputLapTimeCreate = {
        time: "'PT1M33.294S",
        driver_name: "'Klaus Ludwig",
        date: "'1996-08-03"
    }

    const query = createNodeQuery(data)

    expect(query)
        .toEqual(
            "CREATE (node:LapTime {\n" +
            "  time: '\\'PT1M33.294S',\n" +
            "  driver_name: '\\'Klaus Ludwig',\n" +
            "  date: '\\'1996-08-03'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
