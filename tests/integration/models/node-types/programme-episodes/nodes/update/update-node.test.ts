import {describe, expect, test} from 'vitest'
import {ProgrammeEpisode} from "../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {FakeProgrammeEpisode} from "../../../../../../_toolbox/fixtures/nodes/FakeProgrammeEpisode"
import type {ProgrammeEpisodeInput} from "../../../../../../../src/models/node-types/programme-episodes/types/ProgrammeEpisodeInput"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Updating a PROGRAMME EPISODE', () => {
    test('Node does not exist', async () => {
        await expect(ProgrammeEpisode.update(-42, FakeProgrammeEpisode.dbInput() as ProgrammeEpisodeInput))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('Node exists', async () => {
        const createdNode = await seedNode(DbNodeType.ProgrammeEpisode)
        const inputData = FakeProgrammeEpisode.dbInput()
        const updatedNode = await ProgrammeEpisode.update(createdNode.properties.id, inputData as ProgrammeEpisodeInput)

        expect(updatedNode.attributes)
            .toEqual(expect.objectContaining(inputData))
    })

    test('Trying to override read-only properties', async () => {
        const createdNode = await seedNode(DbNodeType.ProgrammeEpisode)
        const validData = FakeProgrammeEpisode.dbInput()
        const readOnlyData = {
            id: 9999,
            created_at: "NOT_ALLOWED_TO_OVERWRITE",
            updated_at: "NOT_ALLOWED_TO_OVERWRITE",
        }
        const inputData = Object.assign({}, validData, readOnlyData)

        const updatedNode = await ProgrammeEpisode.update(createdNode.properties.id, inputData as ProgrammeEpisodeInput)

        expect(updatedNode.attributes)
            .not.toEqual(expect.objectContaining(readOnlyData))
    })
})
