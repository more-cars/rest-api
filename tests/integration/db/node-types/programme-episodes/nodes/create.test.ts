import {describe, expect, test} from 'vitest'
import {FakeProgrammeEpisode} from "../../../../../_toolbox/fixtures/nodes/FakeProgrammeEpisode"
import {createDbNode} from "../../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeProgrammeEpisode.dbInput()
        const createdNode = await createDbNode(DbNodeType.ProgrammeEpisode, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeProgrammeEpisode.dbInputMinimal()
        const createdNode = await createDbNode(DbNodeType.ProgrammeEpisode, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
