import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {CompanyController} from "../../../src/controllers/CompanyController"

describe('Companies', () => {
    vi.mock("../../../src/controllers/CompanyController.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/companies')

        expect(CompanyController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/companies/123')

        expect(CompanyController.getById)
            .toHaveBeenCalledTimes(1)

    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/companies')

        expect(CompanyController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/companies/123')

        expect(CompanyController.delete)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-brand‹ Relationship', async () => {
        await request(app)
            .post('/companies/123/has-brand/456')

        expect(CompanyController.createHasBrandRelation)
            .toHaveBeenCalledTimes(1)
    })
})
