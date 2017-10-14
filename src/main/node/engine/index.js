{
  const _ = require('lodash');

  const Loader = require('../loader');

  const argumentHandler = require('./argumentHandler');

  const PrintUtil = require('../utils/printUtil');
  const Task = require('../task');

  function registerTaskHandlers(tasks) {
    Task.loadTasks(tasks);
    let grunt = Loader.getGrunt();
    _.each(tasks, (v, k) => {
      grunt.registerTask(k, v.description, runPipeline);
    });
  }

  function runPipeline(action) {
    argumentHandler.init();
    let grunt = Loader.getGrunt();
    var task = grunt.task.current;
    var subTasks = Task.getSubTasks(task);
    var subTask = subTasks[action];
    if (!subTask) {
      if (argumentHandler.handleTaskArgs(task)) {
        return;
      }
      let err = `Cannot find sub-task '${action}' for task '${task.name}'`;
      PrintUtil.error(err);
      throw err;
    }
    if (argumentHandler.handleSubTaskArgs(subTask)) {
      return;
    }
    PrintUtil.write(`Running task '${task.name}:${action}',\n${subTask.description}`);
    grunt.task.run(subTask.pipeline);
  }

  module.exports = {
    registerTaskHandlers,
    runPipeline
  };
}
