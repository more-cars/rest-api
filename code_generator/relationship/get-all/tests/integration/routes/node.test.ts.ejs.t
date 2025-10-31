---
inject: true
to: tests/integration/routes/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>.test.ts
before: \}\)\n\}\)
skip_if: Get all ›<%= h.changeCase.kebab(relationshipName) %>‹ Relationships
---
    })

    test('Get all ›<%= h.changeCase.kebab(relationshipName) %>‹ relationships', async () => {
        await request(app)
            .get('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>')

        expect(<%= h.changeCase.pascal(startNodeType) %>Controller.getAll<%= h.changeCase.pascal(relationshipName) %>Relations)
            .toHaveBeenCalledTimes(1)