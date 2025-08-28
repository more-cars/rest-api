export function getApiUrl(environment: string) {
    const apiUrls = new Map<string, string>()
    apiUrls.set('local', 'http://localhost:3000')
    apiUrls.set('minikube-dev', 'http://dev.api.more-cars.internal')
    apiUrls.set('minikube-testing', 'http://testing.api.more-cars.internal')
    apiUrls.set('minikube-prod', 'http://prod.api.more-cars.internal')
    apiUrls.set('testing', 'http://testing.api.fast-cars.info')
    apiUrls.set('prod', 'http://prod.api.fast-cars.info')

    return apiUrls.get(environment)
}
