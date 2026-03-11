import {describe, expect, test} from 'vitest'
import {MotorShow} from "../../../../../../src/models/node-types/motor-shows/MotorShow"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Fetching a MOTOR SHOW', () => {
    test('which does not exist', async () => {
        await expect(MotorShow.findById(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('which exists', async () => {
        const expectedMotorShow = await seedNode(DbNodeType.MotorShow)
        const actualMotorShow = await MotorShow.findById(expectedMotorShow.properties.id)

        expect(actualMotorShow.attributes)
            .toEqual(expectedMotorShow.properties)
    })
})
