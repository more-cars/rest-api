import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {MagazineIssueNode} from "../../../../../../../src/db/node-types/magazine-issues/types/MagazineIssueNode"
import {MagazineIssue} from "../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {FilterOperator} from "../../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all MAGAZINE ISSUE nodes" request returns only the matching nodes', () => {
    test('when there exist no MAGAZINE ISSUE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.MagazineIssue)

        const expectedNodes: MagazineIssueNode[] = []
        const actualNodes = await MagazineIssue.findAll({
            filterByProperty: 'title',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist MAGAZINE ISSUE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.MagazineIssue)
        const nodeA = await seedNode(DbNodeType.MagazineIssue, {title: 'A Node'}) as MagazineIssueNode
        await seedNode(DbNodeType.MagazineIssue, {title: 'B Node'})
        await seedNode(DbNodeType.MagazineIssue, {title: 'C Node'})

        const filteredNodes = await MagazineIssue.findAll({
            filterByProperty: 'title',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.title === nodeA.properties.title)
    })
})
