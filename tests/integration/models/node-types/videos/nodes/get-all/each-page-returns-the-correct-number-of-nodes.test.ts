import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {VideoNode} from "../../../../../../../src/models/node-types/videos/types/VideoNode"
import {Video} from "../../../../../../../src/models/node-types/videos/Video"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"

describe('Each page of a "get all VIDEO nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist no VIDEO nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(DbNodeType.Video)

        const expectedNodes: VideoNode[] = []
        const actualNodes = await Video.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 VIDEO nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(DbNodeType.Video)
        await seedNodes(DbNodeType.Video, totalNodeAmount)

        const actualNodes = await Video.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
