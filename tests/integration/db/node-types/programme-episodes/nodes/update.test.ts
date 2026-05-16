import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {FakeProgrammeEpisode} from "../../../../../_toolbox/fixtures/nodes/FakeProgrammeEpisode"
import {updateDbNode} from "../../../../../../src/db/nodes/updateDbNode"
import type {InputProgrammeEpisodeCreate} from "../../../../../../src/db/node-types/programme-episodes/types/InputProgrammeEpisodeCreate"
import type {ProgrammeEpisodeNode} from "../../../../../../src/db/node-types/programme-episodes/types/ProgrammeEpisodeNode"

describe('Updating PROGRAMME EPISODE', () => {
    test('with valid data', async () => {
        const createdNode = await seedNode(DbNodeType.ProgrammeEpisode)
        const inputData = FakeProgrammeEpisode.dbInput()
        const updatedNode = await updateDbNode(DbNodeType.ProgrammeEpisode, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with the same data', async () => {
        const createdNode = await seedNode(DbNodeType.ProgrammeEpisode)
        const inputData = createdNode.properties as unknown as InputProgrammeEpisodeCreate
        const updatedNode = await updateDbNode(DbNodeType.ProgrammeEpisode, createdNode.properties.id, inputData)

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
        const createdNode = await seedNode(DbNodeType.ProgrammeEpisode)
        const inputData = createdNode.properties as unknown as InputProgrammeEpisodeCreate
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.title = null
        const updatedNode = await updateDbNode(DbNodeType.ProgrammeEpisode, createdNode.properties.id, inputData) as ProgrammeEpisodeNode

        expect(updatedNode.properties.title)
            .toBeNull()
    })
})
