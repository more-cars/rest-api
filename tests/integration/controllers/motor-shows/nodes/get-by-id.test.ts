import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {MotorShow} from "../../../../../src/models/node-types/motor-shows/MotorShow"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

describe('Requesting a MOTOR SHOW by ID', () => {
    test('when it does not exist', async () => {
        MotorShow.findById = vi.fn().mockImplementation(() => {
            throw new NodeNotFoundError(-42)
        })

        const response = await request(app)
            .get('/motor-shows/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('when it does exist', async () => {
        MotorShow.findById = vi.fn().mockReturnValue({
            node_type: ModelNodeType.MotorShow,
            attributes: {
                id: 12345,
            },
        })

        const response = await request(app)
            .get('/motor-shows/12345')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when the request is valid, but something breaks on the way', async () => {
        MotorShow.findById = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/motor-shows/12345')

        expect(response.statusCode)
            .toBe(500)
    })
})
