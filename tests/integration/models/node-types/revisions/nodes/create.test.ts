import {expect, test} from 'vitest'
import {FakeRevision} from "../../../../../_toolbox/fixtures/nodes/FakeRevision"
import {Revision} from "../../../../../../src/models/node-types/revisions/Revision"

test('Expecting node to be created when provided with valid data', async () => {
    const inputData = FakeRevision.dbInput
    const createdNode = await Revision.create(inputData)

    expect(createdNode.attributes)
        .toEqual(expect.objectContaining(inputData))
})

test('Trying to override read-only properties', async () => {
    const validData = FakeRevision.dbInput
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await Revision.create(data)

    expect(createdNode)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
