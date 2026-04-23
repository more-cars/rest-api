import {expect, test} from 'vitest'
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import type {RacingSessionNode} from "../../../../../../src/db/node-types/racing-sessions/types/RacingSessionNode"

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

    const createdNode = await createNeo4jNode(DbNodeType.RacingSession, data) as RacingSessionNode

    expect(createdNode.properties.name)
        .toEqual("'Grand Prix''")

    expect(createdNode.properties.start_date)
        .toEqual("'2025-05-20''")

    expect(createdNode.properties.start_time)
        .toEqual("'14:00''")

    expect(createdNode.properties.duration_unit)
        .toEqual("'min''")

    expect(createdNode.properties.distance_unit)
        .toEqual("'laps''")
})
