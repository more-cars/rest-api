---
inject: true
to: src/controllers/node-types/<%= h.changeCase.pascal(startNodeType) %>Controller.ts
before: \},\n\}
skip_if: async getAll<%= h.changeCase.pascal(relationshipName) %>Relations
---
    },

    async getAll<%= h.changeCase.pascal(relationshipName) %>Relations(req: express.Request, res: express.Response) {
        await getAll<%= h.changeCase.pascal(relationshipName) %>Relations(req, res)