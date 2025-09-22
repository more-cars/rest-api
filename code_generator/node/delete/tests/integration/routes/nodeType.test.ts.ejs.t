---
inject: true
to: tests/integration/routes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>.test.ts
before: \}\)\n\}\)
skip_if: Delete Node
---
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/123')

        expect(<%= h.changeCase.pascal(nodeType) %>Controller.delete)
            .toHaveBeenCalledTimes(1)