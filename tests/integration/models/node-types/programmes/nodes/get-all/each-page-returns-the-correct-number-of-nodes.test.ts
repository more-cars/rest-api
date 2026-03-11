import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {ProgrammeNode} from "../../../../../../../src/models/node-types/programmes/types/ProgrammeNode"
import {Programme} from "../../../../../../../src/models/node-types/programmes/Programme"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"

describe('Each page of a "get all PROGRAMME nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist no PROGRAMME nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(DbNodeType.Programme)

        const expectedNodes: ProgrammeNode[] = []
        const actualNodes = await Programme.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 PROGRAMME nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(DbNodeType.Programme)
        await seedNodes(DbNodeType.Programme, totalNodeAmount)

        const actualNodes = await Programme.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
