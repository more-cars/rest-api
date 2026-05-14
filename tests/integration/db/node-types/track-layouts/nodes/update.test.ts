import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {FakeTrackLayout} from "../../../../../_toolbox/fixtures/nodes/FakeTrackLayout"
import {updateDbNode} from "../../../../../../src/db/nodes/updateDbNode"
import type {InputTrackLayoutCreate} from "../../../../../../src/db/node-types/track-layouts/types/InputTrackLayoutCreate"
import type {TrackLayoutNode} from "../../../../../../src/db/node-types/track-layouts/types/TrackLayoutNode"

describe('Updating TRACK LAYOUT', () => {
    test('with valid data', async () => {
        const createdNode = await seedNode(DbNodeType.TrackLayout)
        const inputData = FakeTrackLayout.dbInput()
        const updatedNode = await updateDbNode(DbNodeType.TrackLayout, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with the same data', async () => {
        const createdNode = await seedNode(DbNodeType.TrackLayout)
        const inputData = createdNode.properties as unknown as InputTrackLayoutCreate
        const updatedNode = await updateDbNode(DbNodeType.TrackLayout, createdNode.properties.id, inputData)

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
        const createdNode = await seedNode(DbNodeType.TrackLayout)
        const inputData = createdNode.properties as unknown as InputTrackLayoutCreate
        // @ts-ignore
        inputData.name = null
        const updatedNode = await updateDbNode(DbNodeType.TrackLayout, createdNode.properties.id, inputData) as TrackLayoutNode

        expect(updatedNode.properties.name)
            .toBeNull()
    })
})
