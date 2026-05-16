import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {FakeProgramme} from "../../../../../_toolbox/fixtures/nodes/FakeProgramme"
import {updateDbNode} from "../../../../../../src/db/nodes/updateDbNode"
import type {InputProgrammeCreate} from "../../../../../../src/db/node-types/programmes/types/InputProgrammeCreate"
import type {ProgrammeNode} from "../../../../../../src/db/node-types/programmes/types/ProgrammeNode"

describe('Updating PROGRAMME', () => {
    test('with valid data', async () => {
        const createdNode = await seedNode(DbNodeType.Programme)
        const inputData = FakeProgramme.dbInput()
        const updatedNode = await updateDbNode(DbNodeType.Programme, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with the same data', async () => {
        const createdNode = await seedNode(DbNodeType.Programme)
        const inputData = createdNode.properties as unknown as InputProgrammeCreate
        const updatedNode = await updateDbNode(DbNodeType.Programme, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(createdNode.properties.updated_at)

        createdNode.properties.updated_at = ''
        updatedNode.properties.updated_at = ''

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('removing a field', async () => {
        const createdNode = await seedNode(DbNodeType.Programme)
        const inputData = createdNode.properties as unknown as InputProgrammeCreate
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.name = null
        const updatedNode = await updateDbNode(DbNodeType.Programme, createdNode.properties.id, inputData) as ProgrammeNode

        expect(updatedNode.properties.name)
            .toBeNull()
    })
})
