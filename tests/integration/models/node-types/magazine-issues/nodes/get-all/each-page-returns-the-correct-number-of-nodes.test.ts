import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {MagazineIssueNode} from "../../../../../../../src/models/node-types/magazine-issues/types/MagazineIssueNode"
import {MagazineIssue} from "../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"

describe('Each page of a "get all MAGAZINE ISSUE nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist no MAGAZINE ISSUE nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(DbNodeType.MagazineIssue)

        const expectedNodes: MagazineIssueNode[] = []
        const actualNodes = await MagazineIssue.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 MAGAZINE ISSUE nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(DbNodeType.MagazineIssue)
        await seedNodes(DbNodeType.MagazineIssue, totalNodeAmount)

        const actualNodes = await MagazineIssue.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
