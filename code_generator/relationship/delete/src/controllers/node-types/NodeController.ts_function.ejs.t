---
inject: true
to: src/controllers/node-types/<%= h.changeCase.pascal(startNodeType) %>Controller.ts
before: \},\n\}
skip_if: async delete<%= h.changeCase.pascal(relationshipName) %>Relation
---
    },

    async delete<%= h.changeCase.pascal(relationshipName) %>Relation(req: express.Request, res: express.Response) {
        await delete<%= h.changeCase.pascal(relationshipName) %>Relation(req, res)