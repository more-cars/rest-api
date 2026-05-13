import {describe, expect, test} from 'vitest'
import {FakeProgramme} from "../../../../../_toolbox/fixtures/nodes/FakeProgramme"
import {createDbNode} from "../../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeProgramme.dbInput()
        const createdNode = await createDbNode(DbNodeType.Programme, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeProgramme.dbInputMinimal()
        const createdNode = await createDbNode(DbNodeType.Programme, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
