import {describe, expect, test} from 'vitest'
import {RaceTrack} from "../../../../../src/models/race-tracks/RaceTrack"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Deleting a RACE TRACK', () => {
    test('that does not exist', async () => {
        await expect(RaceTrack.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(NodeTypeEnum.RACE_TRACK)
        await expect(RaceTrack.delete(node.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
