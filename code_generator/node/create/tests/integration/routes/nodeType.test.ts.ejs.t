---
to: tests/integration/routes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>.test.ts
---
import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../src/app"
import {<%= h.changeCase.pascal(nodeType) %>Controller} from "../../../src/controllers/node-types/<%= h.changeCase.pascal(nodeType) %>Controller"

describe('<%= h.changeCase.title(h.inflection.pluralize(nodeType)) %>', () => {
    vi.mock("../../../src/controllers/node-types/<%= h.changeCase.pascal(nodeType) %>Controller.ts", {spy: true})

    test('Create Node', async () => {
        await request(app)
            .post('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>')

        expect(<%= h.changeCase.pascal(nodeType) %>Controller.create)
            .toHaveBeenCalledTimes(1)
    })
})
