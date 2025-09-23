export function convertToCliParameters(parameters: any) {
    const cliParams = []

    for (const param in parameters) {
        cliParams.push(`--${param}='${parameters[param]}'`)
    }

    return cliParams.join(' ')
}
