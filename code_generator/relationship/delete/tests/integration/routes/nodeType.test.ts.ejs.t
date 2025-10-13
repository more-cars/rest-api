---
inject: true
to: tests/integration/routes/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>.test.ts
before: \}\)\n\}\)
skip_if: Delete ›<%= h.changeCase.kebab(relationshipName) %>‹ Relationship
---
    })

    test('Delete ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship', async () => {
        await request(app)
            .delete('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>/456')

        expect(<%= h.changeCase.pascal(startNodeType) %>Controller.delete<%= h.changeCase.pascal(relationshipName) %>Relation)
            .toHaveBeenCalledTimes(1)