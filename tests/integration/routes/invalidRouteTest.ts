import {app} from "../../../src/app"

const request = require('supertest')

describe('GET /this-route-does-not-exist', () => {
    it('should not find anything', async () => {
        await request(app)
            .get('/this-route-does-not-exist')
            .expect(404)
    })
})
