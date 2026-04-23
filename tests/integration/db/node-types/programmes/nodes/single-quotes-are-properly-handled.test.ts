import {expect, test} from 'vitest'
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import type {ProgrammeNode} from "../../../../../../src/db/node-types/programmes/types/ProgrammeNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        name: "'Top Gear''",
        aired_from_year: 2002,
        aired_until_year: 2022,
        channel: "'BBC Two''",
        total_seasons: 33,
        total_episodes: 240,
        regular_episode_running_time: "'PT60M''",
        country_code: "'GB''",
    }

    const createdNode = await createNeo4jNode(DbNodeType.Programme, data) as ProgrammeNode

    expect(createdNode.properties.name)
        .toEqual("'Top Gear''")

    expect(createdNode.properties.channel)
        .toEqual("'BBC Two''")

    expect(createdNode.properties.regular_episode_running_time)
        .toEqual("'PT60M''")

    expect(createdNode.properties.country_code)
        .toEqual("'GB''")
})
