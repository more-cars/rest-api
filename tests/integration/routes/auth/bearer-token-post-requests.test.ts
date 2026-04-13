import {describe, expect, test} from 'vitest'
import request from "supertest"
import {app} from "../../../../src/app"
import {FakeBrand} from "../../../_toolbox/fixtures/nodes/FakeBrand"

describe('Authentication for POST requests', () => {
    describe('Auth is enabled', () => {
        test('User provides no credentials', async () => {
            process.env.API_ACCESS_TOKEN = 'supersecretapikey'

            const response = await request(app)
                .post('/brands')
                .send(FakeBrand.dbInput)

            expect(response.statusCode)
                .toEqual(401)
        })

        test('User provides invalid credentials', async () => {
            process.env.API_ACCESS_TOKEN = 'supersecretapikey'
            const token = 'invalidkey'

            const response = await request(app)
                .post('/brands')
                .send(FakeBrand.dbInput)
                .set('Authorization', 'Bearer ' + token)

            expect(response.statusCode)
                .toEqual(401)
        })

        test('User provides valid credentials', async () => {
            process.env.API_ACCESS_TOKEN = 'supersecretapikey'
            const token = 'supersecretapikey'

            const response = await request(app)
                .post('/brands')
                .send(FakeBrand.dbInput)
                .set('Authorization', 'Bearer ' + token)

            expect(response.statusCode)
                .toEqual(201)
        })
    })

    describe('Auth is disabled', () => {
        test('User provides no credentials', async () => {
            process.env.API_ACCESS_TOKEN = ''

            const response = await request(app)
                .post('/brands')
                .send(FakeBrand.dbInput)

            expect(response.statusCode)
                .toEqual(201)
        })

        test('User provides any credentials', async () => {
            process.env.API_ACCESS_TOKEN = ''
            const token = 'anykey'

            const response = await request(app)
                .post('/brands')
                .send(FakeBrand.dbInput)
                .set('Authorization', 'Bearer ' + token)

            expect(response.statusCode)
                .toEqual(201)
        })
    })
})
