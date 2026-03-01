import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {MagazineIssueNode} from "../../../../../../../src/db/node-types/magazine-issues/types/MagazineIssueNode"
import {MagazineIssue} from "../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all MAGAZINE ISSUE nodes" request returns the nodes in correct order', () => {
    test('when there exist no MAGAZINE ISSUE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.MagazineIssue)

        const expectedNodes: MagazineIssueNode[] = []
        const actualNodes = await MagazineIssue.findAll({sortByProperty: 'title', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist MAGAZINE ISSUE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.MagazineIssue)
        const nodeA = await seedNode(DbNodeType.MagazineIssue, {title: 'A Node'}) as MagazineIssueNode
        const nodeB = await seedNode(DbNodeType.MagazineIssue, {title: 'B Node'}) as MagazineIssueNode
        const nodeC = await seedNode(DbNodeType.MagazineIssue, {title: 'C Node'}) as MagazineIssueNode

        const ascNodes = await MagazineIssue.findAll({sortByProperty: 'title', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].attributes.title === nodeA.properties.title)
        expect(ascNodes[1].attributes.title === nodeB.properties.title)
        expect(ascNodes[2].attributes.title === nodeC.properties.title)

        const descNodes = await MagazineIssue.findAll({sortByProperty: 'title', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].attributes.title === nodeC.properties.title)
        expect(descNodes[1].attributes.title === nodeB.properties.title)
        expect(descNodes[2].attributes.title === nodeA.properties.title)
    })
})
