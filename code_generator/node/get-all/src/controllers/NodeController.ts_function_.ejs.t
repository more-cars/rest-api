---
inject: true
to: src/controllers/<%= h.changeCase.pascal(nodeType) %>Controller.ts
before: \}\n\}
skip_if: await getAll
---
    }

    static async getAll(req: express.Request, res: express.Response) {
        await getAll(req, res)