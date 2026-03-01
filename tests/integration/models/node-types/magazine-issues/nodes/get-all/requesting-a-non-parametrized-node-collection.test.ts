import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {MagazineIssueNode} from "../../../../../../../src/models/node-types/magazine-issues/types/MagazineIssueNode"
import {MagazineIssue} from "../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"

describe('A non-parametrized "get all MAGAZINE ISSUE nodes" request returns the correct number of nodes', () => {
    test('when there exist no MAGAZINE ISSUE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.MagazineIssue)

        const expectedNodes: MagazineIssueNode[] = []
        const actualNodes = await MagazineIssue.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist MAGAZINE ISSUE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.MagazineIssue)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(DbNodeType.MagazineIssue, amount)

        const actualNodes = await MagazineIssue.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
