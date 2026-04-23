import {describe, expect, test} from 'vitest'
import {FakeMotorShow} from "../../../../../_toolbox/fixtures/nodes/FakeMotorShow"
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeMotorShow.dbInput
        const createdNode = await createNeo4jNode(DbNodeType.MotorShow, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeMotorShow.dbInputMinimal
        const createdNode = await createNeo4jNode(DbNodeType.MotorShow, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
