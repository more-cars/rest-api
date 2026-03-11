import {expect, test} from 'vitest'
import {Integer, Node} from "neo4j-driver"
import {convertProgrammeEpisodeNeo4jNodeToDbNode} from "../../../../../src/db/node-types/programme-episodes/convertProgrammeEpisodeNeo4jNodeToDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import type {ProgrammeEpisodeNode} from "../../../../../src/db/node-types/programme-episodes/types/ProgrammeEpisodeNode"

test('the Neo4j node is correctly mapped to a More Cars node', async () => {
    const dbNode: Node = {
        identity: new Integer,
        labels: [],
        properties: {
            mc_id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            title: "The Falls Guys",
            season_number: 2,
            season_episode_number: 2,
            original_air_date: "2017-12-08",
            duration: "PT55M",
        },
        elementId: "",
    }

    const mappedNode = convertProgrammeEpisodeNeo4jNodeToDbNode(dbNode)

    expect(mappedNode)
        .toStrictEqual({
            node_type: DbNodeType.ProgrammeEpisode,
            properties: {
                id: 1,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
                title: "The Falls Guys",
                season_number: 2,
                season_episode_number: 2,
                original_air_date: "2017-12-08",
                duration: "PT55M",
            },
        } satisfies ProgrammeEpisodeNode)
})
