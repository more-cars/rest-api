import {beforeEach, describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {NodeController} from "../../../src/controllers/NodeController"

beforeEach(() => {
    vi.resetAllMocks()
})

vi.mock("../../../src/controllers/NodeController.ts", {spy: true})

describe('Nodes', () => {
    test('Get prime images for 1 node', async () => {
        await request(app)
            .get('/nodes/12345677/has-prime-image')

        expect(NodeController.getNodesPrimeImage)
            .toHaveBeenCalledTimes(1)
    })

    test('Get prime images for multiple nodes', async () => {
        await request(app)
            .get('/nodes/12345677,12345678,12345679/has-prime-image')

        expect(NodeController.getNodesPrimeImage)
            .toHaveBeenCalledTimes(1)
    })
})
