import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/node-types/session-results/createNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        position: 1,
        race_number: "'44''",
        driver_name: "'Lewis Hamilton''",
        team_name: "'Mercedes''",
        race_time: "'PT1H23M45.678S''",
        laps: 51,
        status: "'finished''",
        points: 25,
    }

    const createdNode = await createNode(data)

    expect(createdNode.properties.race_number)
        .toEqual("'44''")

    expect(createdNode.properties.driver_name)
        .toEqual("'Lewis Hamilton''")

    expect(createdNode.properties.team_name)
        .toEqual("'Mercedes''")

    expect(createdNode.properties.race_time)
        .toEqual("'PT1H23M45.678S''")

    expect(createdNode.properties.status)
        .toEqual("'finished''")
})
