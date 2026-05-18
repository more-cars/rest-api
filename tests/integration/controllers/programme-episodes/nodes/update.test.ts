import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {ProgrammeEpisode} from "../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {app} from "../../../../../src/app.ts"
import {FakeProgrammeEpisode} from "../../../../_toolbox/fixtures/nodes/FakeProgrammeEpisode"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Update PROGRAMME EPISODE', () => {
    test('Node does not exist', async () => {
        vi.spyOn(ProgrammeEpisode, 'update')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(-42)
            })

        const response = await request(app)
            .patch('/programme-episodes/-42')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Input data is valid', async () => {
        ProgrammeEpisode.update = vi.fn().mockReturnValue(FakeProgrammeEpisode.modelOutput())

        const response = await request(app)
            .patch('/programme-episodes/42')
            .send({
                "title": "The Falls Guys - Updated",
            })

        expect(response.statusCode)
            .toBe(200)
    })

    test('Request is empty', async () => {
        ProgrammeEpisode.update = vi.fn().mockReturnValue(FakeProgrammeEpisode.modelOutput())

        const response = await request(app)
            .patch('/programme-episodes/42') // payload is missing

        expect(response.statusCode)
            .toBe(200)
    })

    test('Trying to remove a mandatory field', async () => {
        const createdNode = await seedNode(DbNodeType.ProgrammeEpisode)
        const inputData = createdNode.properties
        inputData.title = null

        const response = await request(app)
            .patch('/programme-episodes/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(400)
    })

    test('Removing an optional field', async () => {
        const createdNode = await seedNode(DbNodeType.ProgrammeEpisode)
        const inputData = createdNode.properties
        inputData.season_number = null

        const response = await request(app)
            .patch('/programme-episodes/' + createdNode.properties.id)
            .send(inputData)

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        ProgrammeEpisode.update = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .patch('/programme-episodes/42')
            .send({
                "title": "The Falls Guys - Updated",
            })

        expect(response.statusCode)
            .toBe(500)
    })
})
