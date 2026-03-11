import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {MotorShowNode} from "../../../../../../../src/db/node-types/motor-shows/types/MotorShowNode"
import {MotorShow} from "../../../../../../../src/models/node-types/motor-shows/MotorShow"
import {FilterOperator} from "../../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all MOTOR SHOW nodes" request returns only the matching nodes', () => {
    test('when there exist no MOTOR SHOW nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.MotorShow)

        const expectedNodes: MotorShowNode[] = []
        const actualNodes = await MotorShow.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist MOTOR SHOW nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.MotorShow)
        const nodeA = await seedNode(DbNodeType.MotorShow, {name: 'A Node'}) as MotorShowNode
        await seedNode(DbNodeType.MotorShow, {name: 'B Node'})
        await seedNode(DbNodeType.MotorShow, {name: 'C Node'})

        const filteredNodes = await MotorShow.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.name === nodeA.properties.name)
    })
})
