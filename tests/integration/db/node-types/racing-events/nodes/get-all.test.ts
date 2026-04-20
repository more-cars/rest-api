import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {RacingEventNode} from "../../../../../../src/db/node-types/racing-events/types/RacingEventNode"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {fetchNodesFromDb} from "../../../../../../src/db/nodes/fetchNodesFromDb"

test('When there are no RACING EVENTS then an empty array should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.RacingEvent)

    const expectedRacingEvents: RacingEventNode[] = []
    const actualRacingEvents = await fetchNodesFromDb(DbNodeType.RacingEvent)

    expect(actualRacingEvents)
        .toEqual(expectedRacingEvents)
})

test('When RACING EVENTS exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.RacingEvent)
    const amount = Math.ceil(Math.random() * 20)
    await seedNodes(DbNodeType.RacingEvent, amount)

    const actualRacingEvents = await fetchNodesFromDb(DbNodeType.RacingEvent)

    expect(actualRacingEvents.length)
        .toEqual(amount)
})
