import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {RacingGame} from "../../../../../src/models/node-types/racing-games/RacingGame"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {app} from "../../../../../src/app.ts"
import {FakeRacingGame} from "../../../../_toolbox/fixtures/nodes/FakeRacingGame"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Update RACING GAME', () => {
    test('Node does not exist', async () => {
        vi.spyOn(RacingGame, 'update')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(-42)
            })

        const response = await request(app)
            .patch('/racing-games/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Input data is valid', async () => {
        RacingGame.update = vi.fn().mockReturnValue(FakeRacingGame.modelOutput())

        const response = await request(app)
            .patch('/racing-games/42')
            .send({
                "name": "Forza Motorsport 7 - Updated",
            })

        expect(response.statusCode)
            .toBe(200)
    })

    test.skip('Request is invalid', async () => {
        const response = await request(app)
            .patch('/racing-games/42') // payload is missing

        expect(response.statusCode)
            .toBe(400)
    })

    test('Trying to remove a mandatory field', async () => {
        const createdNode = await seedNode(DbNodeType.RacingGame)
        const inputData = createdNode.properties
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.name = null

        const response = await request(app)
            .patch('/racing-games/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(400)
    })

    test('Removing an optional field', async () => {
        const createdNode = await seedNode(DbNodeType.RacingGame)
        const inputData = createdNode.properties
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.developer = null

        const response = await request(app)
            .patch('/racing-games/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        RacingGame.update = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .patch('/racing-games/42')
            .send({
                "name": "Forza Motorsport 7 - Updated",
            })

        expect(response.statusCode)
            .toBe(500)
    })
})
