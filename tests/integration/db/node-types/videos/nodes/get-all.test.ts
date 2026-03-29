import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {VideoNode} from "../../../../../../src/db/node-types/videos/types/VideoNode"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../../src/db/node-types/videos/getAllNodesOfType"

test('When there are no VIDEOS then an empty array should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.Video)

    const expectedVideos: VideoNode[] = []
    const actualVideos = await getAllNodesOfType()

    expect(actualVideos)
        .toEqual(expectedVideos)
})

test('When VIDEOS exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.Video)
    const amount = Math.ceil(Math.random() * 20)
    await seedNodes(DbNodeType.Video, amount)

    const actualVideos = await getAllNodesOfType()

    expect(actualVideos.length)
        .toEqual(amount)
})
