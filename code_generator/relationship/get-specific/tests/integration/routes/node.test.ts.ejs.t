---
inject: true
to: tests/integration/routes/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>.test.ts
after: describe\(
skip_if: has<%= h.changeCase.pascal(relationshipName) %>Relation
---
    test('Has "<%= h.inflection.humanize(relationshipName, true) %>" Relationship', async () => {
        await request(app)
            .get('/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>/456')

        expect(<%= h.changeCase.pascal(startNodeType) %>Controller.has<%= h.changeCase.pascal(relationshipName) %>Relation)
            .toHaveBeenCalledTimes(1)
    })