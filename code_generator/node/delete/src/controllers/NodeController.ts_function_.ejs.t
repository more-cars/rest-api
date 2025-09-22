---
inject: true
to: src/controllers/<%= h.changeCase.pascal(nodeType) %>Controller.ts
before: \}\n\}
skip_if: await deleteNode
---
    }

    static async delete(req: express.Request, res: express.Response) {
        await deleteNode(req, res)