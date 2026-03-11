import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../../src/app.ts"
import {ProgrammeEpisode} from "../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {FakeProgrammeEpisode} from "../../../../../_toolbox/fixtures/nodes/FakeProgrammeEpisode"

describe('Expecting correct status code when requesting a plain node collection', () => {
    test('when no nodes exist', async () => {
        ProgrammeEpisode.findAll = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/programme-episodes')

        expect(response.statusCode)
            .toBe(200)
    })

    test('when multiple nodes exist', async () => {
        ProgrammeEpisode.findAll = vi.fn().mockReturnValue([
            FakeProgrammeEpisode.modelOutput,
            FakeProgrammeEpisode.modelOutput,
            FakeProgrammeEpisode.modelOutput,
        ])

        const response = await request(app)
            .get('/programme-episodes')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Input is valid, but something breaks on the way', async () => {
        ProgrammeEpisode.findAll = vi.fn().mockImplementation(() => {
            throw new Error()
        })

        const response = await request(app)
            .get('/programme-episodes')

        expect(response.statusCode)
            .toBe(500)
    })
})
