import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {RacingEventNode} from "../../../../../../src/models/node-types/racing-events/types/RacingEventNode"
import {RacingEvent} from "../../../../../../src/models/node-types/racing-events/RacingEvent"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('A paginated "get all RACING EVENT nodes" request returns the correct number of nodes', () => {
    test('when there exist no RACING EVENT nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.RacingEvent)

        const expectedNodes: RacingEventNode[] = []
        const actualNodes = await RacingEvent.findAll({page: 1})

        expect(expectedNodes)
            .toEqual(actualNodes)
    })

    test('when there exist RACING EVENT nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.RacingEvent)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(DbNodeType.RacingEvent, amount)

        const actualNodes = await RacingEvent.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
