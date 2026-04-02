export const appInstanceId = process.env.API_NAMESPACE || (Math.ceil(Math.random() * 10_000_000) + 10_000_000).toString(16)

export function getNamespacedNodeTypeLabel(nodeTypeLabel: string) {
    const apiNamespaceSuffix = process.env.API_NAMESPACE === 'default' ? '' : '_A_' + appInstanceId
    const userNamespaceSuffix = process.env.USER_NAMESPACE ? '_U_' + process.env.USER_NAMESPACE : ''

    return nodeTypeLabel + apiNamespaceSuffix + userNamespaceSuffix
}

export function getDenamespacedNodeTypeLabel(namespacedNodeTypeLabel: string) {
    return namespacedNodeTypeLabel.split('_')[0]
}
