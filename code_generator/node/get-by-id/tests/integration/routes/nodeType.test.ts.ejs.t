---
inject: true
to: tests/integration/routes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>.test.ts
before: \}\)\n\}\)
skip_if: Get Node by ID
---
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/123')

        expect(<%= h.changeCase.pascal(nodeType) %>Controller.getById)
            .toHaveBeenCalledTimes(1)
