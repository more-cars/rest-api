import {describe, expect, test} from 'vitest'
import request from "supertest"
import {app} from "../../../../src/app"
import {seedBrand} from "../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {FakeBrand} from "../../../_toolbox/fixtures/nodes/FakeBrand"

describe('Authentication for "PATCH node" requests', () => {
    describe('Auth is enabled', () => {
        test('User provides no credentials', async () => {
            const brand = await seedBrand()

            process.env.API_ACCESS_TOKEN = 'supersecretapikey'

            const response = await request(app)
                .patch('/brands/' + brand.properties.id)
                .send(FakeBrand.dbInput())

            expect(response.statusCode)
                .toEqual(401)
        })

        test('User provides invalid credentials', async () => {
            const brand = await seedBrand()

            process.env.API_ACCESS_TOKEN = 'supersecretapikey'
            const token = 'invalidkey'

            const response = await request(app)
                .patch('/brands/' + brand.properties.id)
                .set('Authorization', 'Bearer ' + token)
                .send(FakeBrand.dbInput())

            expect(response.statusCode)
                .toEqual(401)
        })

        test('User provides valid credentials', async () => {
            const brand = await seedBrand()

            process.env.API_ACCESS_TOKEN = 'supersecretapikey'
            const token = 'supersecretapikey'

            const response = await request(app)
                .patch('/brands/' + brand.properties.id)
                .set('Authorization', 'Bearer ' + token)
                .send(FakeBrand.dbInput())

            expect(response.statusCode)
                .toEqual(200)
        })
    })

    describe('Auth is disabled', () => {
        test('User provides no credentials', async () => {
            const brand = await seedBrand()

            process.env.API_ACCESS_TOKEN = ''

            const response = await request(app)
                .patch('/brands/' + brand.properties.id)
                .send(FakeBrand.dbInput())

            expect(response.statusCode)
                .toEqual(200)
        })

        test('User provides any credentials', async () => {
            const brand = await seedBrand()

            process.env.API_ACCESS_TOKEN = ''
            const token = 'anykey'

            const response = await request(app)
                .patch('/brands/' + brand.properties.id)
                .set('Authorization', 'Bearer ' + token)
                .send(FakeBrand.dbInput())

            expect(response.statusCode)
                .toEqual(200)
        })
    })
})
