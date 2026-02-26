---
inject: true
to: src/controllers/node-types/<%= h.changeCase.pascal(nodeType) %>Controller.ts
before: \},\n\}
skip_if: async getAll
---
    },

    async getAll(req: express.Request, res: express.Response) {
        await getAll(req, res)