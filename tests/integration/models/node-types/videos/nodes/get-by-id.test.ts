import {describe, expect, test} from 'vitest'
import {Video} from "../../../../../../src/models/node-types/videos/Video"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Fetching a VIDEO', () => {
    test('which does not exist', async () => {
        await expect(Video.findById(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('which exists', async () => {
        const expectedVideo = await seedNode(DbNodeType.Video)
        const actualVideo = await Video.findById(expectedVideo.properties.id)

        expect(actualVideo.attributes)
            .toEqual(expectedVideo.properties)
    })
})
