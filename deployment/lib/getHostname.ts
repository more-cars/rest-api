export function getHostname(cluster: string, environment: string, service: string) {
    const domain = cluster === 'gke' ? 'more-cars.net' : 'more-cars.internal'

    return `${service}.${environment}.${domain}`
}
