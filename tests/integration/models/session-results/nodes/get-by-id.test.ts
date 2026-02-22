import {expect, test} from 'vitest'
import {SessionResult} from "../../../../../src/models/node-types/session-results/SessionResult"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

test('Fetching a SESSION RESULT that does not exist should return "false"', async () => {
    const expectedSessionResult = false
    const actualSessionResult = await SessionResult.findById(-42)

    expect(actualSessionResult)
        .toEqual(expectedSessionResult)
})

test('When the SESSION RESULT exists it should be returned', async () => {
    const expectedSessionResult = await seedNode(DbNodeType.SessionResult)
    const actualSessionResult = await SessionResult.findById(expectedSessionResult.properties.id)

    expect(actualSessionResult.attributes)
        .toEqual(expectedSessionResult.properties)
})
