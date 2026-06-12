import {describe, expect, test} from 'vitest'
import request from "supertest"
import {app} from "../../../../src/app"
import {seedBrand} from "../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedCompany} from "../../../_toolbox/dbSeeding/companies/nodes/seedCompany"

describe('Authentication for "POST relationship" requests', () => {
    describe('Auth is enabled', () => {
        test('User provides no credentials', async () => {
            const brand = await seedBrand()
            const company = await seedCompany()

            process.env.API_ACCESS_TOKEN = 'supersecretapikey'

            const response = await request(app)
                .post('/brands/' + brand.properties.id + '/relationships/belongs-to-company')
                .send({
                    data: {
                        'type': 'companies',
                        'id': company.properties.id,
                    }
                })

            expect(response.statusCode)
                .toEqual(401)
        })

        test('User provides invalid credentials', async () => {
            const brand = await seedBrand()
            const company = await seedCompany()

            process.env.API_ACCESS_TOKEN = 'supersecretapikey'
            const token = 'invalidkey'

            const response = await request(app)
                .post('/brands/' + brand.properties.id + '/relationships/belongs-to-company')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    data: {
                        'type': 'companies',
                        'id': company.properties.id,
                    }
                })

            expect(response.statusCode)
                .toEqual(401)
        })

        test('User provides valid credentials', async () => {
            const brand = await seedBrand()
            const company = await seedCompany()

            process.env.API_ACCESS_TOKEN = 'supersecretapikey'
            const token = 'supersecretapikey'

            const response = await request(app)
                .post('/brands/' + brand.properties.id + '/relationships/belongs-to-company')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    data: {
                        'type': 'companies',
                        'id': company.properties.id,
                    }
                })

            expect(response.statusCode)
                .toEqual(204)
        })
    })

    describe('Auth is disabled', () => {
        test('User provides no credentials', async () => {
            const brand = await seedBrand()
            const company = await seedCompany()

            process.env.API_ACCESS_TOKEN = ''

            const response = await request(app)
                .post('/brands/' + brand.properties.id + '/relationships/belongs-to-company')
                .send({
                    data: {
                        'type': 'companies',
                        'id': company.properties.id,
                    }
                })

            expect(response.statusCode)
                .toEqual(204)
        })

        test('User provides any credentials', async () => {
            const brand = await seedBrand()
            const company = await seedCompany()

            process.env.API_ACCESS_TOKEN = ''
            const token = 'anykey'

            const response = await request(app)
                .post('/brands/' + brand.properties.id + '/relationships/belongs-to-company')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    data: {
                        'type': 'companies',
                        'id': company.properties.id,
                    }
                })

            expect(response.statusCode)
                .toEqual(204)
        })
    })
})
