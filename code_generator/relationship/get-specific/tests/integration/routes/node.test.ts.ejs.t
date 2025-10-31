---
inject: true
to: tests/integration/routes/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>.test.ts
after: describe\(
skip_if: has<%= h.changeCase.pascal(relationshipName) %>Relation
---
    test('Get specific ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship', async () => {
        await request(app)
            .get('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>/456')

        expect(<%= h.changeCase.pascal(startNodeType) %>Controller.has<%= h.changeCase.pascal(relationshipName) %>Relation)
            .toHaveBeenCalledTimes(1)
    })