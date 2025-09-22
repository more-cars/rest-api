---
inject: true
to: tests/integration/routes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>.test.ts
before: \}\)\n\}\)
skip_if: Get all Nodes
---
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>')

        expect(<%= h.changeCase.pascal(nodeType) %>Controller.getAll)
            .toHaveBeenCalledTimes(1)