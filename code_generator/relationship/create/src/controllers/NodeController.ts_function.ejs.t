---
inject: true
to: src/controllers/<%= h.changeCase.pascal(startNodeType) %>Controller.ts
before: \},\n\}
skip_if: async create<%= h.changeCase.pascal(relationshipName) %>Relation
---
    },

    async create<%= h.changeCase.pascal(relationshipName) %>Relation(req: express.Request, res: express.Response) {
        await create<%= h.changeCase.pascal(relationshipName) %>Relation(req, res)