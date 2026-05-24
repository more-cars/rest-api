---
inject: true
to: src/controllers/node-types/<%= h.changeCase.pascal(nodeType) %>Controller.ts
before: \},\n\}
skip_if: async update
---
    },

    async update(req: express.Request, res: express.Response) {
        await updateNode(req, res)