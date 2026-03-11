import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {MotorShowNode} from "../../../../../../../src/models/node-types/motor-shows/types/MotorShowNode"
import {MotorShow} from "../../../../../../../src/models/node-types/motor-shows/MotorShow"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"

describe('A non-parametrized "get all MOTOR SHOW nodes" request returns the correct number of nodes', () => {
    test('when there exist no MOTOR SHOW nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.MotorShow)

        const expectedNodes: MotorShowNode[] = []
        const actualNodes = await MotorShow.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist MOTOR SHOW nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.MotorShow)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(DbNodeType.MotorShow, amount)

        const actualNodes = await MotorShow.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
