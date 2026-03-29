import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {VideoNode} from "../../../../../../../src/db/node-types/videos/types/VideoNode"
import {Video} from "../../../../../../../src/models/node-types/videos/Video"
import {FilterOperator} from "../../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all VIDEO nodes" request returns only the matching nodes', () => {
    test('when there exist no VIDEO nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Video)

        const expectedNodes: VideoNode[] = []
        const actualNodes = await Video.findAll({
            filterByProperty: 'title',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist VIDEO nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Video)
        const nodeA = await seedNode(DbNodeType.Video, {title: 'A Node'}) as VideoNode
        await seedNode(DbNodeType.Video, {title: 'B Node'})
        await seedNode(DbNodeType.Video, {title: 'C Node'})

        const filteredNodes = await Video.findAll({
            filterByProperty: 'title',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.title === nodeA.properties.title)
    })
})
