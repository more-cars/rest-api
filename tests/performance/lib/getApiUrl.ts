export function getApiUrl(testRunner: string, targetCluster: string, targetEnvironment: string, override: string | undefined) {
    if (override && override !== "") {
        return override
    }

    const apiUrls = new Map([
        ['local', new Map([ // runner
            ['local', new Map([ // cluster
                ['local', 'http://localhost:3000'], // environment
            ])],
            ['minikube', new Map([
                ['dev', 'http://api.dev.more-cars.internal'],
                ['testing', 'http://api.testing.more-cars.internal'],
                ['prod', 'http://api.prod.more-cars.internal'],
            ])],
            ['gke', new Map([
                ['testing', 'http://api.testing.fast-cars.info'],
                ['prod', 'http://api.prod.fast-cars.info'],
            ])],
        ])],
        ['minikube', new Map([ // runner
            ['minikube', new Map([ // cluster
                ['dev', 'API_SERVICE_SERVICE_HOST'], // environment
                ['testing', 'API_SERVICE_SERVICE_HOST'],
                ['prod', 'API_SERVICE_SERVICE_HOST'],
            ])],
        ])],
        ['gke', new Map([ // runner
            ['gke', new Map([ // cluster
                ['testing', 'API_SERVICE_SERVICE_HOST'], // environment
                ['prod', 'API_SERVICE_SERVICE_HOST'],
            ])],
        ])],
    ])

    return apiUrls.get(testRunner)?.get(targetCluster)?.get(targetEnvironment) || ''
}
