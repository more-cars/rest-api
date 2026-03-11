import {expect, test} from 'vitest'
import {FakeProgrammeEpisode} from "../../../../../_toolbox/fixtures/nodes/FakeProgrammeEpisode"
import {ProgrammeEpisode} from "../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"

test('Expecting node to be created when provided with valid data', async () => {
    const inputData = FakeProgrammeEpisode.dbInput
    const createdNode = await ProgrammeEpisode.create(inputData)

    expect(createdNode.attributes)
        .toEqual(expect.objectContaining(inputData))
})

test('Trying to override read-only properties', async () => {
    const validData = FakeProgrammeEpisode.dbInput
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await ProgrammeEpisode.create(data)

    expect(createdNode)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
