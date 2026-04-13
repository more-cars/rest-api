import {describe, expect, test} from 'vitest'
import request from "supertest"
import {app} from "../../../../src/app"

describe('Authentication for GET requests', () => {
    describe('Auth is enabled', () => {
        test('User provides no credentials', async () => {
            process.env.API_ACCESS_TOKEN = 'supersecretapikey'

            const response = await request(app)
                .get('/brands')

            expect(response.statusCode)
                .toEqual(200)
        })

        test('User provides invalid credentials', async () => {
            process.env.API_ACCESS_TOKEN = 'supersecretapikey'
            const token = 'invalidkey'

            const response = await request(app)
                .get('/brands')
                .set('Authorization', 'Bearer ' + token)

            expect(response.statusCode)
                .toEqual(200)
        })

        test('User provides valid credentials', async () => {
            process.env.API_ACCESS_TOKEN = 'supersecretapikey'
            const token = 'supersecretapikey'

            const response = await request(app)
                .get('/brands')
                .set('Authorization', 'Bearer ' + token)

            expect(response.statusCode)
                .toEqual(200)
        })
    })

    describe('Auth is disabled', () => {
        test('User provides no credentials', async () => {
            process.env.API_ACCESS_TOKEN = ''

            const response = await request(app)
                .get('/brands')

            expect(response.statusCode)
                .toEqual(200)
        })

        test('User provides any credentials', async () => {
            process.env.API_ACCESS_TOKEN = ''
            const token = 'anykey'

            const response = await request(app)
                .get('/brands')
                .set('Authorization', 'Bearer ' + token)

            expect(response.statusCode)
                .toEqual(200)
        })
    })
})
