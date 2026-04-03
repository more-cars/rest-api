import {expect, test} from 'vitest'
import {InputMotorShowCreate} from "../../../../../src/db/node-types/motor-shows/types/InputMotorShowCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a MOTOR SHOW node', async () => {
    const data: InputMotorShowCreate = {
        name: "2017 IAA Frankfurt",
        date_from: "2017-09-14",
        date_until: "2017-09-24",
        location: "Frankfurt",
        target_audience: "international",
        focus: "new cars"
    }

    const query = createNodeQuery(DbNodeType.MotorShow, data)

    expect(query)
        .toEqual(
            "CREATE (node:MotorShow_A_" + appInstanceId + " {\n" +
            "  name: '2017 IAA Frankfurt',\n" +
            "  date_from: '2017-09-14',\n" +
            "  date_until: '2017-09-24',\n" +
            "  location: 'Frankfurt',\n" +
            "  target_audience: 'international',\n" +
            "  focus: 'new cars'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
