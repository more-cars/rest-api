import {fileSelector, ItemType} from "inquirer-file-selector"

export async function getTestScenario(override: string | undefined) {
    if (override && override !== "") {
        return override
    }

    const selection = await fileSelector({
        message: 'Select test file:',
        basePath: __dirname + '/../scenarios',
        type: ItemType.File,
        filter: (item) => {
            return (item.isDirectory) || /\.(ts)$/i.test(item.name)
        },
    })

    return selection.path.slice(selection.path.indexOf('scenarios') + 10)
}
