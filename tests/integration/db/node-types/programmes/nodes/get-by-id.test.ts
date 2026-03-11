import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../../src/db/node-types/programmes/getNodeById"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {ProgrammeSchema} from "../../../../../_toolbox/schemas/db/ProgrammeSchema"
import {validateJson} from "../../../../../_toolbox/validateJson"

test('Querying a PROGRAMME that does not exist should return "false"', async () => {
    const expectedProgrammeNode = false
    const actualProgrammeNode = await getNodeById(-42)

    expect(actualProgrammeNode)
        .toBe(expectedProgrammeNode)
})

test('Querying an existing PROGRAMME should return a db node with correct schema', async () => {
    const createdNode = await seedNode(DbNodeType.Programme)
    const programmeNode = await getNodeById(createdNode.properties.id)

    expect(validateJson(programmeNode, ProgrammeSchema))
        .toBeTruthy()
})
