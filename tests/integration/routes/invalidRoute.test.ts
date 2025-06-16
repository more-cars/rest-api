import {app} from "../../../src/app"
import request from "supertest"

it('GET /this-route-does-not-exist should not find anything', async () => {
    await request(app)
        .get('/this-route-does-not-exist')
        .expect(404)
})
