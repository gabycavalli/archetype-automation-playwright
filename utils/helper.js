let testPlan;
let testExecution;

function setTestPlan(id) {
    testPlan = id;
    return testPlan;
}

function getTestPlan() {
    return testPlan;
}

function setTestExecution(id) {
    testExecution = id;
}

function getTestExecution() {
    return testExecution;
}

function getStateOfJiraIsActive() {
    return process.env.JIRA_TRACKING === 'true';
}

module.exports = { setTestPlan, getTestPlan, setTestExecution, getTestExecution, getStateOfJiraIsActive };
