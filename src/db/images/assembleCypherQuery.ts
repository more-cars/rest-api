export function assembleCypherQuery(id: number) {
    return `
MATCH (node:Image {mc_id: ${id}})
RETURN node
LIMIT 1`.trim()
}
