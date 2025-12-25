export function getHostname(cluster: string, environment: string, service: string) {
    const domain = cluster === 'gke' ? 'fast-cars.info' : 'more-cars.internal'

    return `${environment}.${service}.${domain}`
}
