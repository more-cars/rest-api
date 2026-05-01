import {expect, test} from 'vitest'
import type {QueryInputData} from "../../../../../src/db/types/QueryInputData"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a PROGRAMME node', async () => {
    const data: QueryInputData = {
        name: "Top Gear",
        aired_from_year: 2002,
        aired_until_year: 2022,
        channel: "BBC Two",
        total_seasons: 33,
        total_episodes: 240,
        regular_episode_running_time: "PT60M",
        country_code: "GB",
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
    }

    const query = createNodeQuery(DbNodeType.Programme, data)

    expect(query)
        .toEqual(
            "CREATE (n:Programme_A_" + appInstanceId + " {\n" +
            "  name: 'Top Gear',\n" +
            "  aired_from_year: 2002,\n" +
            "  aired_until_year: 2022,\n" +
            "  channel: 'BBC Two',\n" +
            "  total_seasons: 33,\n" +
            "  total_episodes: 240,\n" +
            "  regular_episode_running_time: 'PT60M',\n" +
            "  country_code: 'GB',\n" +
            "  created_at: '2025-05-14T11:05:07.793Z',\n" +
            "  updated_at: '2025-05-14T11:05:07.793Z'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
