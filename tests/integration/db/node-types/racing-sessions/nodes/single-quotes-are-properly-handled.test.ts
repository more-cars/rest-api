import {expect, test} from 'vitest'
import {createDbNode} from "../../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import type {RacingSessionNode} from "../../../../../../src/db/node-types/racing-sessions/types/RacingSessionNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        name: "'Grand Prix''",
        start_date: "'2025-05-20''",
        start_time: "'14:00''",
        duration: "'PT120M''",
        distance: 58,
        distance_unit: "'laps''",
    }

    const createdNode = await createDbNode(DbNodeType.RacingSession, data) as RacingSessionNode

    expect(createdNode.properties.name)
        .toEqual("'Grand Prix''")

    expect(createdNode.properties.start_date)
        .toEqual("'2025-05-20''")

    expect(createdNode.properties.start_time)
        .toEqual("'14:00''")

    expect(createdNode.properties.duration)
        .toEqual("'PT120M''")

    expect(createdNode.properties.distance_unit)
        .toEqual("'laps''")
})
