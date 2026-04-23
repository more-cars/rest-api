import {expect, test} from 'vitest'
import {InputProgrammeCreate} from "../../../../../src/db/node-types/programmes/types/InputProgrammeCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('single quotes are correctly escaped', async () => {
    const data: InputProgrammeCreate = {
        name: "'Top Gear",
        aired_from_year: null,
        aired_until_year: null,
        channel: "'BBC Two",
        total_seasons: null,
        total_episodes: null,
        regular_episode_running_time: "'PT60M",
        country_code: "'GB",
    }

    const query = createNodeQuery(DbNodeType.Programme, data, "2025-05-14T11:05:07.793Z")

    expect(query)
        .toEqual(
            "CREATE (n:Programme_A_" + appInstanceId + " {\n" +
            "  name: '\\'Top Gear',\n" +
            "  aired_from_year: null,\n" +
            "  aired_until_year: null,\n" +
            "  channel: '\\'BBC Two',\n" +
            "  total_seasons: null,\n" +
            "  total_episodes: null,\n" +
            "  regular_episode_running_time: '\\'PT60M',\n" +
            "  country_code: '\\'GB',\n" +
            "  created_at: '2025-05-14T11:05:07.793Z',\n" +
            "  updated_at: '2025-05-14T11:05:07.793Z'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
