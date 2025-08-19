---
inject: true
to: tests/integration/routes/<%= h.inflection.pluralize(h.changeCase.kebab(nodetype)) %>.test.ts
after: vi.mock
skip_if: Delete Node
---
    test('Delete Node', async () => {
        await request(app)
            .delete('/images/123')

        expect(ImageController.delete)
            .toHaveBeenCalledTimes(1)
    })