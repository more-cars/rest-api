import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {TrackLayoutNode} from "../../../../../../src/models/node-types/track-layouts/types/TrackLayoutNode"
import {TrackLayout} from "../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('A paginated "get all TRACK LAYOUT nodes" request returns the correct number of nodes', () => {
    test('when there exist no TRACK LAYOUT nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.TrackLayout)

        const expectedNodes: TrackLayoutNode[] = []
        const actualNodes = await TrackLayout.findAll({page: 1})

        expect(expectedNodes)
            .toEqual(actualNodes)
    })

    test('when there exist TRACK LAYOUT nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.TrackLayout)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(DbNodeType.TrackLayout, amount)

        const actualNodes = await TrackLayout.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
