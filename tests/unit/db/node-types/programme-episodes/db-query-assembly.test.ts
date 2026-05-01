import {expect, test} from 'vitest'
import type {QueryInputData} from "../../../../../src/db/types/QueryInputData"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a PROGRAMME EPISODE node', async () => {
    const data: QueryInputData = {
        title: "The Falls Guys",
        season_number: 2,
        season_episode_number: 2,
        original_air_date: "2017-12-08",
        duration: "PT55M",
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
    }

    const query = createNodeQuery(DbNodeType.ProgrammeEpisode, data)

    expect(query)
        .toEqual(
            "CREATE (n:ProgrammeEpisode_A_" + appInstanceId + " {\n" +
            "  title: 'The Falls Guys',\n" +
            "  season_number: 2,\n" +
            "  season_episode_number: 2,\n" +
            "  original_air_date: '2017-12-08',\n" +
            "  duration: 'PT55M',\n" +
            "  created_at: '2025-05-14T11:05:07.793Z',\n" +
            "  updated_at: '2025-05-14T11:05:07.793Z'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
