import {describe, expect, test} from 'vitest'
import {Programme} from "../../../../../../src/models/node-types/programmes/Programme"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Fetching a PROGRAMME', () => {
    test('which does not exist', async () => {
        await expect(Programme.findById(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('which exists', async () => {
        const expectedProgramme = await seedNode(DbNodeType.Programme)
        const actualProgramme = await Programme.findById(expectedProgramme.properties.id)

        expect(actualProgramme.attributes)
            .toEqual(expectedProgramme.properties)
    })
})
