import {describe, expect, test} from 'vitest'
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {FakeTrackLayout} from "../../../../../../_toolbox/fixtures/nodes/FakeTrackLayout"
import type {TrackLayoutInput} from "../../../../../../../src/models/node-types/track-layouts/types/TrackLayoutInput"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Updating a TRACK LAYOUT', () => {
    test('Node does not exist', async () => {
        await expect(TrackLayout.update(-42, FakeTrackLayout.dbInput() as TrackLayoutInput))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('Node exists', async () => {
        const createdNode = await seedNode(DbNodeType.TrackLayout)
        const inputData = FakeTrackLayout.dbInput()
        const updatedNode = await TrackLayout.update(createdNode.properties.id, inputData as TrackLayoutInput)

        expect(updatedNode.attributes)
            .toEqual(expect.objectContaining(inputData))
    })

    test('Trying to override read-only properties', async () => {
        const createdNode = await seedNode(DbNodeType.TrackLayout)
        const validData = FakeTrackLayout.dbInput()
        const readOnlyData = {
            id: 9999,
            created_at: "NOT_ALLOWED_TO_OVERWRITE",
            updated_at: "NOT_ALLOWED_TO_OVERWRITE",
        }
        const inputData = Object.assign({}, validData, readOnlyData)

        const updatedNode = await TrackLayout.update(createdNode.properties.id, inputData as TrackLayoutInput)

        expect(updatedNode.attributes)
            .not.toEqual(expect.objectContaining(readOnlyData))
    })
})
