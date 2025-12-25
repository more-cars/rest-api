export function getDatabasePortNumber(environment: string, protocol: string) {
    const portMapping = new Map<string, Map<string, number>>([
        ['testing', new Map([
                ['http', 31474],
                ['https', 31473],
                ['bolt', 31687],
            ],
        )],
        ['prod', new Map([
                ['http', 30474],
                ['https', 30473],
                ['bolt', 30687],
            ],
        )],
        ['dev', new Map([
                ['http', 32474],
                ['https', 32473],
                ['bolt', 32687],
            ],
        )],
    ])

    return portMapping.get(environment)?.get(protocol)
}
