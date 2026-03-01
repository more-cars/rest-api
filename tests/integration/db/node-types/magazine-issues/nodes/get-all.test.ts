import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {MagazineIssueNode} from "../../../../../../src/db/node-types/magazine-issues/types/MagazineIssueNode"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../../src/db/node-types/magazine-issues/getAllNodesOfType"

test('When there are no MAGAZINE ISSUES then an empty array should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.MagazineIssue)

    const expectedMagazineIssues: MagazineIssueNode[] = []
    const actualMagazineIssues = await getAllNodesOfType()

    expect(actualMagazineIssues)
        .toEqual(expectedMagazineIssues)
})

test('When MAGAZINE ISSUES exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.MagazineIssue)
    const amount = Math.ceil(Math.random() * 20)
    await seedNodes(DbNodeType.MagazineIssue, amount)

    const actualMagazineIssues = await getAllNodesOfType()

    expect(actualMagazineIssues.length)
        .toEqual(amount)
})
