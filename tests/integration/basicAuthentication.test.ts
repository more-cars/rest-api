import {beforeAll, describe, expect, test} from 'vitest'
import request from "supertest"
import {app} from "../../src/app"

describe('Basic auth is activated', () => {
    beforeAll(async () => {
        process.env.BASIC_AUTH_USERNAME = 'username'
        process.env.BASIC_AUTH_PASSWORD = 'password'
    })

    test('Request without credentials', async () => {
        const response = await request(app)
            .get('/')

        expect(response.statusCode)
            .toEqual(401)
    })

    test('Request with incorrect credentials', async () => {
        const username = 'test'
        const password = 'test'

        const token = Buffer.from(`${username}:${password}`).toString('base64')

        const response = await request(app)
            .get('/')
            .set('Authorization', 'Basic ' + token)

        expect(response.statusCode)
            .toEqual(401)
    })

    test('Request with correct credentials', async () => {
        const username = 'username'
        const password = 'password'

        const token = Buffer.from(`${username}:${password}`).toString('base64')

        const response = await request(app)
            .get('/')
            .set('Authorization', 'Basic ' + token)

        expect(response.statusCode)
            .toEqual(200)
    })
})
