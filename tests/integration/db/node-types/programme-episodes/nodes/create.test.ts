import {describe, expect, test} from 'vitest'
import {FakeProgrammeEpisode} from "../../../../../_toolbox/fixtures/nodes/FakeProgrammeEpisode"
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeProgrammeEpisode.dbInput
        const createdNode = await createNeo4jNode(DbNodeType.ProgrammeEpisode, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeProgrammeEpisode.dbInputMinimal
        const createdNode = await createNeo4jNode(DbNodeType.ProgrammeEpisode, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
