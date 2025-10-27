import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/nodes/racing-sessions/createNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        name: "'Grand Prix''",
        start_date: "'2025-05-20''",
        start_time: "'14:00''",
        duration: 120,
        duration_unit: "'min''",
        distance: 58,
        distance_unit: "'laps''",
    }

    const createdNode = await createNode(data)

    expect(createdNode.name)
        .toEqual("'Grand Prix''")

    expect(createdNode.start_date)
        .toEqual("'2025-05-20''")

    expect(createdNode.start_time)
        .toEqual("'14:00''")

    expect(createdNode.duration_unit)
        .toEqual("'min''")

    expect(createdNode.distance_unit)
        .toEqual("'laps''")
})
