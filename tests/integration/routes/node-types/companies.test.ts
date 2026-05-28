import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../../src/app"
import {CompanyController} from "../../../../src/controllers/node-types/CompanyController"

vi.mock("../../../../src/controllers/node-types/CompanyController.ts", {spy: true})

describe('Companies', () => {
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

    test('Update Node', async () => {
        await request(app)
            .patch('/companies/123')

        expect(CompanyController.update)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/companies/123')

        expect(CompanyController.delete)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-brand‹ relationship', async () => {
        await request(app)
            .post('/companies/123/relationships/has-brand')
            .send({
                data: {
                    type: "has-brand",
                    id: 456,
                }
            })

        expect(CompanyController.createHasBrandRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-brand‹ relationships', async () => {
        await request(app)
            .get('/companies/123/has-brand')

        expect(CompanyController.getAllHasBrandRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-brand‹ relationship', async () => {
        await request(app)
            .delete('/companies/123/relationships/has-brand')
            .send({
                data: {
                    type: "has-brand",
                    id: 456,
                },
            })

        expect(CompanyController.deleteHasBrandRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-image‹ relationship', async () => {
        await request(app)
            .post('/companies/123/relationships/has-image')
            .send({
                data: {
                    type: "has-image",
                    id: 456,
                }
            })

        expect(CompanyController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-image‹ relationships', async () => {
        await request(app)
            .get('/companies/123/has-image')

        expect(CompanyController.getAllHasImageRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-image‹ relationship', async () => {
        await request(app)
            .delete('/companies/123/relationships/has-image')
            .send({
                data: {
                    type: "has-image",
                    id: 456,
                },
            })

        expect(CompanyController.deleteHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-prime-image‹ relationship', async () => {
        await request(app)
            .post('/companies/123/relationships/has-prime-image')
            .send({
                data: {
                    type: "has-prime-image",
                    id: 456,
                }
            })

        expect(CompanyController.createHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-prime-image‹ relationship', async () => {
        await request(app)
            .get('/companies/123/has-prime-image')

        expect(CompanyController.getHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-prime-image‹ relationship', async () => {
        await request(app)
            .delete('/companies/123/relationships/has-prime-image')
            .send({
                data: {
                    type: "has-prime-image",
                    id: 456,
                },
            })

        expect(CompanyController.deleteHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-video‹ relationship', async () => {
        await request(app)
            .post('/companies/123/relationships/has-video')
            .send({
                data: {
                    type: "has-video",
                    id: 456,
                }
            })

        expect(CompanyController.createHasVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-video‹ relationships', async () => {
        await request(app)
            .get('/companies/123/has-video')

        expect(CompanyController.getAllHasVideoRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-video‹ relationship', async () => {
        await request(app)
            .delete('/companies/123/relationships/has-video')
            .send({
                data: {
                    type: "has-video",
                    id: 456,
                },
            })

        expect(CompanyController.deleteHasVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-main-video‹ relationship', async () => {
        await request(app)
            .post('/companies/123/relationships/has-main-video')
            .send({
                data: {
                    type: "has-main-video",
                    id: 456,
                }
            })

        expect(CompanyController.createHasMainVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-main-video‹ relationship', async () => {
        await request(app)
            .get('/companies/123/has-main-video')

        expect(CompanyController.getHasMainVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-main-video‹ relationship', async () => {
        await request(app)
            .delete('/companies/123/relationships/has-main-video')
            .send({
                data: {
                    type: "has-main-video",
                    id: 456,
                },
            })

        expect(CompanyController.deleteHasMainVideoRelation)
            .toHaveBeenCalledTimes(1)
    })
})
