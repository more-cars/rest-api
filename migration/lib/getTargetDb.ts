export function getTargetDb(migrationRunner: string, targetCluster: string, targetEnvironment: string, override: string | undefined) {
    if (override && override !== "") {
        return override
    }

    const dbUrls = new Map([
        ['local', new Map([ // runner
            ['local', new Map([ // cluster
                ['local', 'localhost'], // environment
            ])],
            ['minikube', new Map([
                ['dev', 'db.dev.more-cars.internal'],
                ['testing', 'db.testing.more-cars.internal'],
                ['prod', 'db.prod.more-cars.internal'],
            ])],
            ['gke', new Map([
                ['testing', 'db.testing.fast-cars.info'],
                ['prod', 'db.prod.fast-cars.info'],
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

    return dbUrls.get(migrationRunner)?.get(targetCluster)?.get(targetEnvironment) || ''
}
