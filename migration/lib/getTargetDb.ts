export function getTargetDb(testRunner: string, targetCluster: string, targetEnvironment: string, override: string | undefined) {
    if (override && override !== "") {
        return override
    }

    const dbUrls = new Map([
        ['local', new Map([ // runner
            ['local', new Map([ // cluster
                ['local', 'localhost'], // environment
            ])],
            ['minikube', new Map([
                ['dev', 'dev.db.more-cars.internal'],
                ['testing', 'testing.db.more-cars.internal'],
                ['prod', 'prod.db.more-cars.internal'],
            ])],
            ['gke', new Map([
                ['testing', 'testing.db.fast-cars.info'],
                ['prod', 'prod.db.fast-cars.info'],
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

    return dbUrls.get(testRunner)?.get(targetCluster)?.get(targetEnvironment) || ''
}
