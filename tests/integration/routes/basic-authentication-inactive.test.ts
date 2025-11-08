import {afterAll, beforeAll, describe, expect, test} from 'vitest'
import request from "supertest"
import {app} from "../../../src/app"

describe('Basic authentication is deactivated', () => {
    beforeAll(async () => {
        process.env.BASIC_AUTH_USERNAME = ''
        process.env.BASIC_AUTH_PASSWORD = ''
    })

    afterAll(async () => {
        delete process.env.BASIC_AUTH_USERNAME
        delete process.env.BASIC_AUTH_PASSWORD
    })

    test('Request without credentials', async () => {
        const response = await request(app)
            .get('/')

        expect(response.statusCode)
            .toEqual(200)
    })

    test('Request with unnecessary credentials', async () => {
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
