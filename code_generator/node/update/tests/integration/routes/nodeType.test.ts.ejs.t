---
inject: true
to: tests/integration/routes/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>.test.ts
before: Delete Node
skip_if: Update Node
---
    test('Update Node', async () => {
        await request(app)
            .patch('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/123')

        expect(<%= h.changeCase.pascal(nodeType) %>Controller.update)
            .toHaveBeenCalledTimes(1)
    })
