import {describe, expect, test} from 'vitest'
import {Programme} from "../../../../../../../src/models/node-types/programmes/Programme"
import {FakeProgramme} from "../../../../../../_toolbox/fixtures/nodes/FakeProgramme"
import type {ProgrammeInput} from "../../../../../../../src/models/node-types/programmes/types/ProgrammeInput"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Updating a PROGRAMME', () => {
    test('Node does not exist', async () => {
        await expect(Programme.update(-42, FakeProgramme.dbInput() as ProgrammeInput))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('Node exists', async () => {
        const createdNode = await seedNode(DbNodeType.Programme)
        const inputData = FakeProgramme.dbInput()
        const updatedNode = await Programme.update(createdNode.properties.id, inputData as ProgrammeInput)

        expect(updatedNode.attributes)
            .toEqual(expect.objectContaining(inputData))
    })

    test('Trying to override read-only properties', async () => {
        const createdNode = await seedNode(DbNodeType.Programme)
        const validData = FakeProgramme.dbInput()
        const readOnlyData = {
            id: 9999,
            created_at: "NOT_ALLOWED_TO_OVERWRITE",
            updated_at: "NOT_ALLOWED_TO_OVERWRITE",
        }
        const inputData = Object.assign({}, validData, readOnlyData)

        const updatedNode = await Programme.update(createdNode.properties.id, inputData as ProgrammeInput)

        expect(updatedNode.attributes)
            .not.toEqual(expect.objectContaining(readOnlyData))
    })
})
