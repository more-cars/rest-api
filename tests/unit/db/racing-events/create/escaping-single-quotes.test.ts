import {expect, test} from 'vitest'
import {InputRacingEventCreate} from "../../../../../src/db/node-types/racing-events/types/InputRacingEventCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('single quotes are correctly escaped', async () => {
    const data: InputRacingEventCreate = {
        name: "'GP Monaco 2025",
        round: null,
        date_from: "'2025-05-25",
        date_to: "'2025-05-27"
    }

    const query = createNodeQuery(DbNodeType.RacingEvent, data)

    expect(query)
        .toEqual(
            "CREATE (node:RacingEvent_" + appInstanceId + " {\n" +
            "  name: '\\'GP Monaco 2025',\n" +
            "  round: null,\n" +
            "  date_from: '\\'2025-05-25',\n" +
            "  date_to: '\\'2025-05-27'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
