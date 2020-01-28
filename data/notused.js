const csv = readCsvFile("./aidTransfer.csv")

console.log(csv);

const csvJSON = () => {
    const lines = csv.split('\n')
    console.log(lines)
    const result = []
    const headers = lines[0].split(';')

    for (let i = 1; i < lines.length; i++) {        
        if (!lines[i])
            continue
        const obj = {}
        const currentline = lines[i].split(';')

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j]
        }
        result.push(obj)
    }
    console.log(result)
}



csvJSON();