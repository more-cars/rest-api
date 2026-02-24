import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {RaceTrackNode} from "../../../../../../src/db/node-types/race-tracks/types/RaceTrackNode"
import {RaceTrack} from "../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('A sorted "get all RACE TRACK nodes" request returns the nodes in correct order', () => {
    test('when there exist no RACE TRACK nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.RaceTrack)

        const expectedNodes: RaceTrackNode[] = []
        const actualNodes = await RaceTrack.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist RACE TRACK nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.RaceTrack)
        const nodeA = await seedNode(DbNodeType.RaceTrack, {name: 'A Node'}) as RaceTrackNode
        const nodeB = await seedNode(DbNodeType.RaceTrack, {name: 'B Node'}) as RaceTrackNode
        const nodeC = await seedNode(DbNodeType.RaceTrack, {name: 'C Node'}) as RaceTrackNode

        const ascNodes = await RaceTrack.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].attributes.name === nodeA.properties.name)
        expect(ascNodes[1].attributes.name === nodeB.properties.name)
        expect(ascNodes[2].attributes.name === nodeC.properties.name)

        const descNodes = await RaceTrack.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].attributes.name === nodeC.properties.name)
        expect(descNodes[1].attributes.name === nodeB.properties.name)
        expect(descNodes[2].attributes.name === nodeA.properties.name)
    })
})
