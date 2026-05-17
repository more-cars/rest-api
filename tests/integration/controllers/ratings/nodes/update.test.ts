import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {Rating} from "../../../../../src/models/node-types/ratings/Rating"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {app} from "../../../../../src/app.ts"
import {FakeRating} from "../../../../_toolbox/fixtures/nodes/FakeRating"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Update RATING', () => {
    test('Node does not exist', async () => {
        vi.spyOn(Rating, 'update')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(-42)
            })

        const response = await request(app)
            .patch('/ratings/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Input data is valid', async () => {
        Rating.update = vi.fn().mockReturnValue(FakeRating.modelOutput())

        const response = await request(app)
            .patch('/ratings/42')
            .send({
                "rating_value": 95,
                "scale_minimum": 2,
                "scale_maximum": 102,
                "scale_direction": "down",
            })

        expect(response.statusCode)
            .toBe(200)
    })

    test.skip('Request is invalid', async () => {
        const response = await request(app)
            .patch('/ratings/42') // payload is missing

        expect(response.statusCode)
            .toBe(400)
    })

    test('Trying to remove a mandatory field', async () => {
        const createdNode = await seedNode(DbNodeType.Rating)
        const inputData = createdNode.properties
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.rating_value = null

        const response = await request(app)
            .patch('/ratings/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(400)
    })

    test('Input is valid, but something breaks on the way', async () => {
        Rating.update = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .patch('/ratings/42')
            .send({
                "rating_value": 95,
                "scale_minimum": 2,
                "scale_maximum": 102,
                "scale_direction": "up - Updated",
            })

        expect(response.statusCode)
            .toBe(500)
    })
})
