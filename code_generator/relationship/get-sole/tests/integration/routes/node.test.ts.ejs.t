---
inject: true
to: tests/integration/routes/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>.test.ts
after: describe\(
skip_if: get<%= h.changeCase.pascal(relationshipName) %>Relation
---
    test('Get "<%= h.inflection.humanize(relationshipName, true) %>" Relationship', async () => {
        await request(app)
            .get('/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>')

        expect(<%= h.changeCase.pascal(startNodeType) %>Controller.get<%= h.changeCase.pascal(relationshipName) %>Relation)
            .toHaveBeenCalledTimes(1)
    })