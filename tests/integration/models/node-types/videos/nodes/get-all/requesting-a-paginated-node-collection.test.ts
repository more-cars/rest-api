import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {VideoNode} from "../../../../../../../src/models/node-types/videos/types/VideoNode"
import {Video} from "../../../../../../../src/models/node-types/videos/Video"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"

describe('A paginated "get all VIDEO nodes" request returns the correct number of nodes', () => {
    test('when there exist no VIDEO nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Video)

        const expectedNodes: VideoNode[] = []
        const actualNodes = await Video.findAll({page: 1})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist VIDEO nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Video)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(DbNodeType.Video, amount)

        const actualNodes = await Video.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
