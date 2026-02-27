---
inject: true
to: src/controllers/node-types/<%= h.changeCase.pascal(startNodeType) %>Controller.ts
before: \},\n\}
skip_if: async get<%= h.changeCase.pascal(relationshipName) %>Relation
---
    },

    async get<%= h.changeCase.pascal(relationshipName) %>Relation(req: express.Request, res: express.Response) {
        await get<%= h.changeCase.pascal(relationshipName) %>Relation(req, res)