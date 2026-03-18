import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {CarModel} from "../../../../src/models/node-types/car-models/CarModel"
import {app} from "../../../../src/app"
import {FakeCarModel} from "../../../_toolbox/fixtures/nodes/FakeCarModel"
import {Node} from "../../../../src/models/Node"

describe('Expecting node collection response to contain pagination information', () => {
    describe('when the node collection is empty', () => {
        test('and the user provided a pagination parameter', async (page) => {
            CarModel.findAll = vi.fn().mockReturnValue([])

            const response = await request(app)
                .get('/car-models?page=1')

            expect(response.body.meta.page.total_nodes)
                .toEqual(0)
        })

        test('and the user provided no pagination parameter', async (page) => {
            CarModel.findAll = vi.fn().mockReturnValue([])

            const response = await request(app)
                .get('/car-models')

            expect(response.body.meta.page.total_nodes)
                .toEqual(0)
        })
    })

    describe('when the node collection is not empty', () => {
        test('and the user provided a pagination parameter', async (page) => {
            CarModel.findAll = vi.fn().mockReturnValue([
                FakeCarModel.modelOutput,
                FakeCarModel.modelOutput,
                FakeCarModel.modelOutput,
            ])
            Node.getTotalAmount = vi.fn().mockReturnValue(3)

            const response = await request(app)
                .get('/car-models?page=1')

            expect(response.body.meta.page.total_nodes)
                .toEqual(3)
        })

        test('and the user provided no pagination parameter', async (page) => {
            CarModel.findAll = vi.fn().mockReturnValue([
                FakeCarModel.modelOutput,
                FakeCarModel.modelOutput,
                FakeCarModel.modelOutput,
            ])
            Node.getTotalAmount = vi.fn().mockReturnValue(3)

            const response = await request(app)
                .get('/car-models')

            expect(response.body.meta.page.total_nodes)
                .toEqual(3)
        })
    })

    describe('when there are more results than fit on one page', () => {
        test('and the user provided a pagination parameter', async (page) => {
            // faking a page size of 3
            CarModel.findAll = vi.fn().mockReturnValue([
                FakeCarModel.modelOutput,
                FakeCarModel.modelOutput,
                FakeCarModel.modelOutput,
            ])
            Node.getTotalAmount = vi.fn().mockReturnValue(10)

            const response = await request(app)
                .get('/car-models?page=1')

            expect(response.body.meta.page.total_nodes)
                .toEqual(10)
        })

        test('and the user provided no pagination parameter', async (page) => {
            // faking a page size of 3
            CarModel.findAll = vi.fn().mockReturnValue([
                FakeCarModel.modelOutput,
                FakeCarModel.modelOutput,
                FakeCarModel.modelOutput,
            ])
            Node.getTotalAmount = vi.fn().mockReturnValue(10)

            const response = await request(app)
                .get('/car-models')

            expect(response.body.meta.page.total_nodes)
                .toEqual(10)
        })
    })
})
