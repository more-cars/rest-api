import {describe, expect, test} from 'vitest'
import {LapTime} from "../../../../../src/models/lap-times/LapTime"
import {seedLapTime} from "../../../../_toolbox/dbSeeding/lap-times/nodes/seedLapTime"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

describe('Deleting a LAP TIME', () => {
    test('that does not exist', async () => {
        await expect(LapTime.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedLapTime()
        await expect(LapTime.delete(node.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
