import {expect, test} from 'vitest'
import {InputProgrammeCreate} from "../../../../../src/db/node-types/programmes/types/InputProgrammeCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a PROGRAMME node', async () => {
    const data: InputProgrammeCreate = {
        name: "Top Gear",
        aired_from_year: 2002,
        aired_until_year: 2022,
        channel: "BBC Two",
        total_seasons: 33,
        total_episodes: 240,
        regular_episode_running_time: "PT60M",
        country_code: "GB",
    }

    const query = createNodeQuery(DbNodeType.Programme, data)

    expect(query)
        .toEqual(
            "CREATE (node:Programme_A_" + appInstanceId + " {\n" +
            "  name: 'Top Gear',\n" +
            "  aired_from_year: 2002,\n" +
            "  aired_until_year: 2022,\n" +
            "  channel: 'BBC Two',\n" +
            "  total_seasons: 33,\n" +
            "  total_episodes: 240,\n" +
            "  regular_episode_running_time: 'PT60M',\n" +
            "  country_code: 'GB'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
