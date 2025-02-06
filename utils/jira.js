const { createIssueExecutionTest, createIssueTestPlan, linkTestCaseToTestExecution, linkTestCaseToTestPlan, linkTestPlanToTestExecution, setStateIssue, updateTestCaseExecution } = require("library-jira");
const { getStateOfJiraIsActive, getTestExecution, getTestPlan, setTestExecution, setTestPlan } = require("./helper");

async function jiraTrackingBeforeAll() {
    if (getStateOfJiraIsActive()) {
        if (getTestPlan() === undefined) {
            // Create test plan
            // Set global var test plan id
            setTestPlan(await createIssueTestPlan('Test Plan automation').then((response) => {
                return response.data.key;
            }));
            console.log('Test plan id: ' + getTestPlan());

            // Set IN PROGRESS test plan state
            await setStateIssue(getTestPlan(), 21);

            // Create test execution
            // Set global var test execution id
            setTestExecution(await createIssueExecutionTest('Test execution automation - Test plan ' + getTestPlan()).then((testExecution) => {
                return testExecution.data.key;
            }));

            // Set IN PROGRESS test execution state
            await setStateIssue(getTestExecution(), 21);
        }

        console.log('You could see the Test Plan -> https://jira.itspty.com/browse/' + getTestPlan());
        console.log('You could see the Test Execution -> https://jira.itspty.com/browse/' + getTestExecution());

        // Link test plan to test execution
        await linkTestPlanToTestExecution(getTestPlan(), getTestExecution());
    }
}

function getState(result) {
    return result.errs.length === 0 ? 'passed' : 'failed';
}

async function jiraTrackingAfterEach(testInfo) {
    // Validar si el tracking de Jira está activado
    if (getStateOfJiraIsActive()) {
        let stateResultTest;
        let testTitle;

        // Obtener el tag de la prueba actual
        const tagAnnotation = testInfo.annotations.find(annotation => annotation.type === 'tag');
        testTitle = tagAnnotation ? tagAnnotation.description.replace('@', '').split(',')[0] : 'defaultTag';

        // Obtener el estado del resultado de la prueba
        stateResultTest = testInfo.errors.length === 0 ? 'passed' : 'failed';

        // Vincular el caso de prueba con el plan y la ejecución en Jira
        await linkTestCaseToTestPlan(testTitle, getTestPlan());
        await linkTestCaseToTestExecution(testTitle, getTestExecution());
        await updateTestCaseExecution(testTitle, getTestExecution(), getTestPlan(), stateResultTest);
    }
}


module.exports = { jiraTrackingBeforeAll, jiraTrackingAfterEach };
