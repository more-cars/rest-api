import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {TrackLayoutNode} from "../../../../../../src/models/track-layouts/types/TrackLayoutNode"
import {TrackLayout} from "../../../../../../src/models/track-layouts/TrackLayout"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('A paginated "get all TRACK LAYOUT nodes" request returns the correct number of nodes', () => {
    test('when there exist no TRACK LAYOUT nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.TRACK_LAYOUT)

        const expectedNodes: Array<TrackLayoutNode> = []
        const actualNodes = await TrackLayout.findAll({page: 1})

        expect(expectedNodes)
            .toEqual(actualNodes)
    })

    test('when there exist TRACK LAYOUT nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.TRACK_LAYOUT)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(NodeTypeEnum.TRACK_LAYOUT, amount)

        const actualNodes = await TrackLayout.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
