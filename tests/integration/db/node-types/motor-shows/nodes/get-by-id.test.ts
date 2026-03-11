import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../../src/db/node-types/motor-shows/getNodeById"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {MotorShowSchema} from "../../../../../_toolbox/schemas/db/MotorShowSchema"
import {validateJson} from "../../../../../_toolbox/validateJson"

test('Querying a MOTOR SHOW that does not exist should return "false"', async () => {
    const expectedMotorShowNode = false
    const actualMotorShowNode = await getNodeById(-42)

    expect(actualMotorShowNode)
        .toBe(expectedMotorShowNode)
})

test('Querying an existing MOTOR SHOW should return a db node with correct schema', async () => {
    const createdNode = await seedNode(DbNodeType.MotorShow)
    const motorShowNode = await getNodeById(createdNode.properties.id)

    expect(validateJson(motorShowNode, MotorShowSchema))
        .toBeTruthy()
})
