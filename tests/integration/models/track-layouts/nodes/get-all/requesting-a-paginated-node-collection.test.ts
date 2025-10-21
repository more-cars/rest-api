import {describe, expect, test} from 'vitest'
import {deleteAllTrackLayouts} from "../../../../../_toolbox/dbSeeding/track-layouts/nodes/deleteAllTrackLayouts"
import type {TrackLayoutNode} from "../../../../../../src/models/track-layouts/types/TrackLayoutNode"
import {TrackLayout} from "../../../../../../src/models/track-layouts/TrackLayout"
import {seedTrackLayout} from "../../../../../_toolbox/dbSeeding/track-layouts/nodes/seedTrackLayout"

describe('A sorted "get all TRACK LAYOUT nodes" request returns the nodes in correct order', () => {
    test('when there exist NO track layout nodes', async () => {
        await deleteAllTrackLayouts()

        const expectedNodes: Array<TrackLayoutNode> = []
        const actualNodes = await TrackLayout.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist track layout nodes', async () => {
        await deleteAllTrackLayouts()
        const nodeA = await seedTrackLayout({name: 'A Node'})
        const nodeB = await seedTrackLayout({name: 'B Node'})
        const nodeC = await seedTrackLayout({name: 'C Node'})

        const ascNodes = await TrackLayout.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].name === nodeA.name)
        expect(ascNodes[1].name === nodeB.name)
        expect(ascNodes[2].name === nodeC.name)

        const descNodes = await TrackLayout.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].name === nodeC.name)
        expect(descNodes[1].name === nodeB.name)
        expect(descNodes[2].name === nodeA.name)
    })
})
