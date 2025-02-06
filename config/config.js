const ENVS = ['qa', 'ppd'];
const BRANDS = ['xx', 'xx'];

function runTestsForAllCombinations(runTests) {
  //-------- just to debbug ------
  //process.env.ALL = 'true';
  //------------------------------
  var env = '';
  var brand = '';
  if (process.env.ALL === 'true') {
    ENVS.forEach((env) => {
      BRANDS.forEach((brand) => {
        runTests(env, brand);
      });
    });
  } else {
    env = process.env.ENV || 'qa';
    brand = process.env.BRAND || 'xx';
    runTests(env, brand);
  }
}

module.exports = {
  runTestsForAllCombinations,
};
