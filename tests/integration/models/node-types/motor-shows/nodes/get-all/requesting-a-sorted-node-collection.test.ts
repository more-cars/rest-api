import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {MotorShowNode} from "../../../../../../../src/db/node-types/motor-shows/types/MotorShowNode"
import {MotorShow} from "../../../../../../../src/models/node-types/motor-shows/MotorShow"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all MOTOR SHOW nodes" request returns the nodes in correct order', () => {
    test('when there exist no MOTOR SHOW nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.MotorShow)

        const expectedNodes: MotorShowNode[] = []
        const actualNodes = await MotorShow.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist MOTOR SHOW nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.MotorShow)
        const nodeA = await seedNode(DbNodeType.MotorShow, {name: 'A Node'}) as MotorShowNode
        const nodeB = await seedNode(DbNodeType.MotorShow, {name: 'B Node'}) as MotorShowNode
        const nodeC = await seedNode(DbNodeType.MotorShow, {name: 'C Node'}) as MotorShowNode

        const ascNodes = await MotorShow.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].attributes.name === nodeA.properties.name)
        expect(ascNodes[1].attributes.name === nodeB.properties.name)
        expect(ascNodes[2].attributes.name === nodeC.properties.name)

        const descNodes = await MotorShow.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].attributes.name === nodeC.properties.name)
        expect(descNodes[1].attributes.name === nodeB.properties.name)
        expect(descNodes[2].attributes.name === nodeA.properties.name)
    })
})
