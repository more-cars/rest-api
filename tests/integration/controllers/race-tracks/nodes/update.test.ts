import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {RaceTrack} from "../../../../../src/models/node-types/race-tracks/RaceTrack"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {app} from "../../../../../src/app.ts"
import {FakeRaceTrack} from "../../../../_toolbox/fixtures/nodes/FakeRaceTrack"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Update RACE TRACK', () => {
    test('Node does not exist', async () => {
        vi.spyOn(RaceTrack, 'update')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(-42)
            })

        const response = await request(app)
            .patch('/race-tracks/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Input data is valid', async () => {
        RaceTrack.update = vi.fn().mockReturnValue(FakeRaceTrack.modelOutput())

        const response = await request(app)
            .patch('/race-tracks/42')
            .send({
                "name": "Lausitzring - Updated",
            })

        expect(response.statusCode)
            .toBe(201)
    })

    test.skip('Request is invalid', async () => {
        const response = await request(app)
            .patch('/race-tracks/42') // payload is missing

        expect(response.statusCode)
            .toBe(400)
    })

    test('Trying to remove a mandatory field', async () => {
        const createdNode = await seedNode(DbNodeType.RaceTrack)
        const inputData = createdNode.properties
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.name = null

        const response = await request(app)
            .patch('/race-tracks/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(400)
    })

    test('Removing an optional field', async () => {
        const createdNode = await seedNode(DbNodeType.RaceTrack)
        const inputData = createdNode.properties
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.location = null

        const response = await request(app)
            .patch('/race-tracks/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(201)
    })

    test('Input is valid, but something breaks on the way', async () => {
        RaceTrack.update = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .patch('/race-tracks/42')
            .send({
                "name": "Lausitzring - Updated",
            })

        expect(response.statusCode)
            .toBe(500)
    })
})
