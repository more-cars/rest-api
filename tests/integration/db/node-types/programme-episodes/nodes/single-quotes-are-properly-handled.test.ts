import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/node-types/programme-episodes/createNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        title: "'The Falls Guys''",
        season_number: 2,
        season_episode_number: 2,
        original_air_date: "'2017-12-08''",
        duration: "'PT55M''",
    }

    const createdNode = await createNode(data)

    expect(createdNode.properties.title)
        .toEqual("'The Falls Guys''")

    expect(createdNode.properties.original_air_date)
        .toEqual("'2017-12-08''")

    expect(createdNode.properties.duration)
        .toEqual("'PT55M''")
})
