var util = require('util'),
  fs = require('fs');

var mocha = require('mocha');
var Base = mocha.reporters.Base;

module.exports = MochaGraphanaReporter;

function MochaGraphanaReporter(runner) {
  var self = this;
  Base.call(this, runner);

  var tests = [],
    failures = [],
    passes = [];

  runner.on('test end', function (test) {
    tests.push(test);
  });

  runner.on('pass', function (test) {
    passes.push(test);
  });

  runner.on('fail', function (test) {
    failures.push(test);
  });

  runner.on('end', function () {
    var obj = {
      stats: self.stats,
      tests: tests.map(clean),
      failures: failures.map(clean),
      passes: passes.map(clean),
    };
    var jsonOutput = JSON.stringify(obj, null, 2);
    process.stdout.write(jsonOutput);

    try {
      util.print('\nGenerating report.json file');
      var path = './';
      if (process.env.REPORT_PATH) {
        path = process.env.REPORT_PATH;
      }
      var out = fs.openSync(path + '/report.json', 'w');
      fs.writeSync(out, jsonOutput);
      fs.close(out);
      util.print('\nGenerating report.json file complete in ' + path + '\n');
    } catch (error) {
      util.print('\nError: Unable to write to file report.json\n');
    }
  });
}

function clean(test) {
  return {
    title: test.title,
    fullTitle: test.fullTitle(),
    duration: test.duration,
  };
}
