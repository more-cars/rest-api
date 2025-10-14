---
inject: true
to: tests/integration/routes/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>.test.ts
before: \}\)\n\}\)
skip_if: Create ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship
---
    })

    test('Create ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship', async () => {
        await request(app)
            .post('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>/456')

        expect(<%= h.changeCase.pascal(startNodeType) %>Controller.create<%= h.changeCase.pascal(relationshipName) %>Relation)
            .toHaveBeenCalledTimes(1)