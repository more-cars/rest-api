---
inject: true
to: tests/integration/routes/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>.test.ts
before: \}\)\n\}\)
skip_if: Get ›<%= h.changeCase.kebab(relationshipName) %>‹ Relationship
---
    })

    test('Get ›<%= h.changeCase.kebab(relationshipName) %>‹ Relationship', async () => {
        await request(app)
            .get('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>')

        expect(<%= h.changeCase.pascal(startNodeType) %>Controller.get<%= h.changeCase.pascal(relationshipName) %>Relation)
            .toHaveBeenCalledTimes(1)