---
inject: true
to: src/controllers/node-types/<%= h.changeCase.pascal(nodeType) %>Controller.ts
before: \},\n\}
skip_if: async getById
---
    },

    async getById(req: express.Request, res: express.Response) {
        await getById(req, res)