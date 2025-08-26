---
inject: true
to: tests/integration/routes/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>.test.ts
after: describe\(
skip_if: create<%= h.changeCase.pascal(relationshipName) %>Relation
---
    test('Create "<%= h.inflection.humanize(relationshipName, true) %>" Relationship', async () => {
        await request(app)
            .post('/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/123/<%= h.changeCase.kebab(relationshipName) %>/456')

        expect(<%= h.changeCase.pascal(startNodeType) %>Controller.create<%= h.changeCase.pascal(relationshipName) %>Relation)
            .toHaveBeenCalledTimes(1)
    })