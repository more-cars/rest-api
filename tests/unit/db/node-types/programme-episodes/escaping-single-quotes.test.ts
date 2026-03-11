import {expect, test} from 'vitest'
import {InputProgrammeEpisodeCreate} from "../../../../../src/db/node-types/programme-episodes/types/InputProgrammeEpisodeCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('single quotes are correctly escaped', async () => {
    const data: InputProgrammeEpisodeCreate = {
        title: "'The Falls Guys",
        season_number: null,
        season_episode_number: null,
        original_air_date: "'2017-12-08",
        duration: "'PT55M"
    }

    const query = createNodeQuery(DbNodeType.ProgrammeEpisode, data)

    expect(query)
        .toEqual(
            "CREATE (node:ProgrammeEpisode_" + appInstanceId + " {\n" +
            "  title: '\\'The Falls Guys',\n" +
            "  season_number: null,\n" +
            "  season_episode_number: null,\n" +
            "  original_air_date: '\\'2017-12-08',\n" +
            "  duration: '\\'PT55M'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
