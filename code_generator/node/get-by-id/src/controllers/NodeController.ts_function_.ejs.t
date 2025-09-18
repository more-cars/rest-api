---
inject: true
to: src/controllers/<%= h.changeCase.pascal(nodeType) %>Controller.ts
before: \}\n\}
skip_if: await getById
---
    }

    static async getById(req: express.Request, res: express.Response) {
        await getById(req, res)