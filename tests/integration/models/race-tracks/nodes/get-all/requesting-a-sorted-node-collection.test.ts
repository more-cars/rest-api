import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {RaceTrackNode} from "../../../../../../src/models/node-types/race-tracks/types/RaceTrackNode"
import {RaceTrack} from "../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all RACE TRACK nodes" request returns the nodes in correct order', () => {
    test('when there exist no RACE TRACK nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.RACE_TRACK)

        const expectedNodes: RaceTrackNode[] = []
        const actualNodes = await RaceTrack.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist RACE TRACK nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.RACE_TRACK)
        const nodeA = await seedNode(ControllerNodeType.RACE_TRACK, {
            name: 'A Node'}) as unknown as RaceTrackNode
            const nodeB = await seedNode(ControllerNodeType.RACE_TRACK, {
                name: 'B Node'}) as unknown as RaceTrackNode
                const nodeC = await seedNode(ControllerNodeType.RACE_TRACK, {
                    name: 'C Node'}) as unknown as RaceTrackNode

                    const ascNodes = await RaceTrack.findAll({sortByProperty: 'name', sortDirection: 'asc'})
                    expect(ascNodes.length).toEqual(3)
                expect(ascNodes[0].name === nodeA.name)
            expect(ascNodes[1].name === nodeB.name)
        expect(ascNodes[2].name === nodeC.name)

        const descNodes = await RaceTrack.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].name === nodeC.name)
        expect(descNodes[1].name === nodeB.name)
        expect(descNodes[2].name === nodeA.name)
    })
    })
