import {describe, expect, test} from 'vitest'
import {deleteAllTrackLayouts} from "../../../../../_toolbox/dbSeeding/track-layouts/nodes/deleteAllTrackLayouts"
import type {TrackLayoutNode} from "../../../../../../src/models/track-layouts/types/TrackLayoutNode"
import {TrackLayout} from "../../../../../../src/models/track-layouts/TrackLayout"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedTrackLayout} from "../../../../../_toolbox/dbSeeding/track-layouts/nodes/seedTrackLayout"

describe('A filtered "get all TRACK LAYOUT nodes" request returns only the matching nodes', () => {
    test('when there exist NO Track Layout nodes', async () => {
        await deleteAllTrackLayouts()

        const expectedNodes: Array<TrackLayoutNode> = []
        const actualNodes = await TrackLayout.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist Track Layout nodes', async () => {
        await deleteAllTrackLayouts()
        const nodeA = await seedTrackLayout({name: 'A Node'})
        await seedTrackLayout({name: 'B Node'})
        await seedTrackLayout({name: 'C Node'})

        const filteredNodes = await TrackLayout.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].name === nodeA.name)
    })
})
