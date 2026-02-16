export const appInstanceId = process.env.DB_NAMESPACE || (Math.ceil(Math.random() * 10_000_000) + 10_000_000).toString(16)

export function getNamespacedNodeTypeLabel(nodeTypeLabel: string) {
    return nodeTypeLabel + '_' + appInstanceId
}

export function getDenamespacedNodeTypeLabel(namespacedNodeTypeLabel: string) {
    return namespacedNodeTypeLabel.split('_')[0]
}
