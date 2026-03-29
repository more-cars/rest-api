import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {VideoNode} from "../../../../../../../src/db/node-types/videos/types/VideoNode"
import {Video} from "../../../../../../../src/models/node-types/videos/Video"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all VIDEO nodes" request returns the nodes in correct order', () => {
    test('when there exist no VIDEO nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Video)

        const expectedNodes: VideoNode[] = []
        const actualNodes = await Video.findAll({sortByProperty: 'title', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist VIDEO nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Video)
        const nodeA = await seedNode(DbNodeType.Video, {title: 'A Node'}) as VideoNode
        const nodeB = await seedNode(DbNodeType.Video, {title: 'B Node'}) as VideoNode
        const nodeC = await seedNode(DbNodeType.Video, {title: 'C Node'}) as VideoNode

        const ascNodes = await Video.findAll({sortByProperty: 'title', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].attributes.title === nodeA.properties.title)
        expect(ascNodes[1].attributes.title === nodeB.properties.title)
        expect(ascNodes[2].attributes.title === nodeC.properties.title)

        const descNodes = await Video.findAll({sortByProperty: 'title', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].attributes.title === nodeC.properties.title)
        expect(descNodes[1].attributes.title === nodeB.properties.title)
        expect(descNodes[2].attributes.title === nodeA.properties.title)
    })
})
