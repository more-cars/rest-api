import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {MotorShowNode} from "../../../../../../../src/models/node-types/motor-shows/types/MotorShowNode"
import {MotorShow} from "../../../../../../../src/models/node-types/motor-shows/MotorShow"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"

describe('Each page of a "get all MOTOR SHOW nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist no MOTOR SHOW nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(DbNodeType.MotorShow)

        const expectedNodes: MotorShowNode[] = []
        const actualNodes = await MotorShow.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 MOTOR SHOW nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(DbNodeType.MotorShow)
        await seedNodes(DbNodeType.MotorShow, totalNodeAmount)

        const actualNodes = await MotorShow.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
