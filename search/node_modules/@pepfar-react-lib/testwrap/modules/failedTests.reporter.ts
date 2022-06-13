// @ts-ignore
module.exports = class CustomReporter {
    onRunComplete(testContexts, results) {
        if (results.success) return;
        console.log(`\nList of failed tests`)
        results.testResults
            .filter(report=>report.numFailingTests>0)
            .map(report=>report.testFilePath)
            .map(file=>file.replace(/^.+src\//,''))
            .forEach(file=>console.log(file))
    }
}
