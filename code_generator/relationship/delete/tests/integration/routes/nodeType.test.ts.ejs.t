---
inject: true
to: tests/integration/routes/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>.test.ts
before: \}\)\n\}\)
skip_if: Delete ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship
---
    })

    test('Delete ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship', async () => {
        await request(app)
            .delete('/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/123/relationships/<%= h.changeCase.kebab(relationshipName) %>')
            .send({
                data: {
                    type: ControllerNodeType.<%= h.changeCase.pascal(endNodeType) %>,
                    id: 456,
                }
            })

        expect(<%= h.changeCase.pascal(startNodeType) %>Controller.delete<%= h.changeCase.pascal(relationshipName) %>Relation)
            .toHaveBeenCalledTimes(1)