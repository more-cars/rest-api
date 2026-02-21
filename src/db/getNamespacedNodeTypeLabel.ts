export const appInstanceId = process.env.API_NAMESPACE || (Math.ceil(Math.random() * 10_000_000) + 10_000_000).toString(16)

export function getNamespacedNodeTypeLabel(nodeTypeLabel: string) {
    if (process.env.API_NAMESPACE === 'default') {
        return nodeTypeLabel
    }

    return nodeTypeLabel + '_' + appInstanceId
}

export function getDenamespacedNodeTypeLabel(namespacedNodeTypeLabel: string) {
    return namespacedNodeTypeLabel.split('_')[0]
}
