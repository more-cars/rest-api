import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {TrackLayout} from "../../../../../src/models/node-types/track-layouts/TrackLayout"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {app} from "../../../../../src/app.ts"
import {FakeTrackLayout} from "../../../../_toolbox/fixtures/nodes/FakeTrackLayout"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Update TRACK LAYOUT', () => {
    test('Node does not exist', async () => {
        vi.spyOn(TrackLayout, 'update')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(-42)
            })

        const response = await request(app)
            .patch('/track-layouts/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Input data is valid', async () => {
        TrackLayout.update = vi.fn().mockReturnValue(FakeTrackLayout.modelOutput())

        const response = await request(app)
            .patch('/track-layouts/42')
            .send({
                "name": "GP Circuit - Updated",
            })

        expect(response.statusCode)
            .toBe(201)
    })

    test.skip('Request is invalid', async () => {
        const response = await request(app)
            .patch('/track-layouts/42') // payload is missing

        expect(response.statusCode)
            .toBe(400)
    })

    test('Trying to remove a mandatory field', async () => {
        const createdNode = await seedNode(DbNodeType.TrackLayout)
        const inputData = createdNode.properties
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.name = null

        const response = await request(app)
            .patch('/track-layouts/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(400)
    })

    test('Removing an optional field', async () => {
        const createdNode = await seedNode(DbNodeType.TrackLayout)
        const inputData = createdNode.properties
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.direction = null

        const response = await request(app)
            .patch('/track-layouts/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(201)
    })

    test('Input is valid, but something breaks on the way', async () => {
        TrackLayout.update = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .patch('/track-layouts/42')
            .send({
                "name": "GP Circuit - Updated",
            })

        expect(response.statusCode)
            .toBe(500)
    })
})
