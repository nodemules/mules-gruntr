{
  const Loader = require('../loader');
  const PrintUtil = require('../utils/printUtil');
  const Task = require('../task');

  let grunt;
  let ARGS = {};

  function setVerbosity() {
    var verbose = grunt.option('v') || grunt.option('verbose');
    var veryVerbose = grunt.option('debug');
    var verbosity = 0;
    if (veryVerbose) {
      verbosity = 2;
    } else if (verbose) {
      verbosity = 1;
    }
    PrintUtil.setVerbosity(verbosity);
    Object.assign(ARGS, {
      verbosity
    });
  }

  function setArguments() {
    var ls = grunt.option('ls') || grunt.option('list');
    var describe = grunt.option('D') || grunt.option('describe');
    var args = {
      ls,
      describe
    };
    Object.assign(ARGS, args);
  }

  function handleTaskArgs(task) {
    var stop;
    PrintUtil.setVerbosity(ARGS.verbosity || 1);
    if (ARGS.describe) {
      stop = true;
      PrintUtil.write('\n');
      PrintUtil.write(`Task: ${task.name}`);
      PrintUtil.write(`Description: ${task.description || '<no description found>'}`);
    }
    if (ARGS.ls) {
      stop = true;
      PrintUtil.write('\n');
      Task.printSubTasks(task);
    }
    return stop;
  }

  function handleSubTaskArgs(subTask) {
    var stop;
    PrintUtil.setVerbosity(ARGS.verbosity || 1);
    if (ARGS.describe) {
      stop = true;
      PrintUtil.write('\n');
      Task.printSubTaskDescription(subTask);
    }
    if (ARGS.ls) {
      stop = true;
      PrintUtil.write('\n');
      Task.printSubTaskPipeline(subTask);
    }
    return stop;
  }

  function init() {
    grunt = Loader.getGrunt();
    setVerbosity();
    setArguments();
  }

  module.exports = {
    handleSubTaskArgs,
    handleTaskArgs,
    init
  };
}
