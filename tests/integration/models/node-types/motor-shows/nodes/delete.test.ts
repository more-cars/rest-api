import {describe, expect, test} from 'vitest'
import {MotorShow} from "../../../../../../src/models/node-types/motor-shows/MotorShow"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Deleting a MOTOR SHOW', () => {
    test('that does not exist', async () => {
        await expect(MotorShow.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(DbNodeType.MotorShow)
        await expect(MotorShow.delete(node.properties.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
