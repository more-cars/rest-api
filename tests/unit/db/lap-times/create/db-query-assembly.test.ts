import {expect, test} from 'vitest'
import {InputLapTimeCreate} from "../../../../../src/db/nodes/lap-times/types/InputLapTimeCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createDbNode"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a LAP TIME node', async () => {
    const data: InputLapTimeCreate = {
        time: "PT1M33.294S",
        driver_name: "Klaus Ludwig",
        date: "1996-08-03"
    }

    const query = createNodeQuery(NodeTypeLabel.LapTime, data)

    expect(query)
        .toEqual(
            "CREATE (node:LapTime_" + appInstanceId + " {\n" +
            "  time: 'PT1M33.294S',\n" +
            "  driver_name: 'Klaus Ludwig',\n" +
            "  date: '1996-08-03'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
