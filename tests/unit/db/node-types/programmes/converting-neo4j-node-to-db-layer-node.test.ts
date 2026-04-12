import {expect, test} from 'vitest'
import {Integer, Node} from "neo4j-driver"
import {convertProgrammeNeo4jNodeToDbNode} from "../../../../../src/db/node-types/programmes/convertProgrammeNeo4jNodeToDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import type {ProgrammeNode} from "../../../../../src/db/node-types/programmes/types/ProgrammeNode"

test('the Neo4j node is correctly mapped to a More Cars node', async () => {
    const dbNode: Node = {
        identity: new Integer,
        labels: [],
        properties: {
            mc_id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "Top Gear",
            aired_from_year: 2002,
            aired_until_year: 2022,
            channel: "BBC Two",
            total_seasons: 33,
            total_episodes: 240,
            regular_episode_running_time: "PT60M",
            country_code: "GB",
        },
        elementId: "",
    }

    const mappedNode = convertProgrammeNeo4jNodeToDbNode(dbNode)

    expect(mappedNode)
        .toStrictEqual({
            node_type: DbNodeType.Programme,
            properties: {
                id: 1,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
                name: "Top Gear",
                aired_from_year: 2002,
                aired_until_year: 2022,
                channel: "BBC Two",
                total_seasons: 33,
                total_episodes: 240,
                regular_episode_running_time: "PT60M",
                country_code: "GB",
            },
        } satisfies ProgrammeNode)
})
