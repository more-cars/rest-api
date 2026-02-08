import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {RaceTrackNode} from "../../../../../../src/models/race-tracks/types/RaceTrackNode"
import {RaceTrack} from "../../../../../../src/models/race-tracks/RaceTrack"
import {seedRaceTrack} from "../../../../../_toolbox/dbSeeding/race-tracks/nodes/seedRaceTrack"

describe('A sorted "get all RACE TRACK nodes" request returns the nodes in correct order', () => {
    test('when there exist NO race track nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.RACE_TRACK)

        const expectedNodes: Array<RaceTrackNode> = []
        const actualNodes = await RaceTrack.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist race track nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.RACE_TRACK)
        const nodeA = await seedRaceTrack({name: 'A Node'})
        const nodeB = await seedRaceTrack({name: 'B Node'})
        const nodeC = await seedRaceTrack({name: 'C Node'})

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
