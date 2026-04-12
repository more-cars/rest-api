import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/node-types/programmes/createNode"

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

    const createdNode = await createNode(data)

    expect(createdNode.properties.name)
        .toEqual("'Top Gear''")

    expect(createdNode.properties.channel)
        .toEqual("'BBC Two''")

    expect(createdNode.properties.regular_episode_running_time)
        .toEqual("'PT60M''")

    expect(createdNode.properties.country_code)
        .toEqual("'GB''")
})
