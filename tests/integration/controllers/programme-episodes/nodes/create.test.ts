import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {ProgrammeEpisode} from "../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {FakeProgrammeEpisode} from "../../../../_toolbox/fixtures/nodes/FakeProgrammeEpisode"

test('Input data is valid', async () => {
    ProgrammeEpisode.create = vi.fn().mockReturnValue(FakeProgrammeEpisode.modelOutput)

    const response = await request(app)
        .post('/programme-episodes')
        .send({
            title: "The Falls Guys",
        })

    expect(response.statusCode)
        .toBe(201)
})

test('Input data is structurally invalid', async () => {
    const response = await request(app)
        .post('/programme-episodes')
        .send({}) // mandatory fields are missing

    expect(response.statusCode)
        .toBe(400)
})

test('Request is invalid', async () => {
    const response = await request(app)
        .post('/programme-episodes') // payload is missing

    expect(response.statusCode)
        .toBe(400)
})

test('Input is valid, but something breaks on the way', async () => {
    ProgrammeEpisode.create = vi.fn().mockImplementation(() => {
        throw new Error()
    })

    const response = await request(app)
        .post('/programme-episodes')
        .send({
            title: "The Falls Guys",
        })

    expect(response.statusCode)
        .toBe(500)
})
