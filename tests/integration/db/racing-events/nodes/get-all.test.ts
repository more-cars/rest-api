import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEventNode} from "../../../../../src/db/nodes/racing-events/types/RacingEventNode"
import {seedNodes} from "../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../src/db/nodes/racing-events/getAllNodesOfType"

test('When there are no RACING EVENTS then an empty array should be returned', async () => {
    await deleteAllNodesOfType(NodeTypeEnum.RACING_EVENT)

    const expectedRacingEvents: RacingEventNode[] = []
    const actualRacingEvents = await getAllNodesOfType()

    expect(actualRacingEvents)
        .toEqual(expectedRacingEvents)
})

test('When RACING EVENTS exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(NodeTypeEnum.RACING_EVENT)
    const amount = Math.ceil(Math.random() * 50)
    await seedNodes(NodeTypeEnum.RACING_EVENT, amount)

    const actualRacingEvents = await getAllNodesOfType()

    expect(actualRacingEvents.length)
        .toEqual(amount)
})
