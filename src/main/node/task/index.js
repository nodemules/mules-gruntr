{

  const _ = require('lodash');

  const PrintUtil = require('../utils/printUtil');

  var tasks = {};

  function loadTasks(tasksToLoad, clear) {
    if (clear) {
      tasks = {};
    }
    _.each(tasksToLoad, (v, k) => {
      tasks[k] = v.tasks;
    });
  }

  function getSubTasks(task) {
    var subTasks = tasks[task.name];
    _.forEach(subTasks, (v, k) => {
      v.name = k;
    });
    return subTasks;
  }

  function printSubTasks(task) {
    PrintUtil.write(`The following sub-tasks were found for task ${task.name}:\n`);
    _.forEach(this.getSubTasks(task), (subTask) => {
      PrintUtil.write(`  - ${subTask.name}: ${subTask.description}\n`);
    });
  }

  function printSubTaskDescription(subTask) {
    PrintUtil.write('Describing a subtask\n');
    PrintUtil.write(`Name: ${subTask.name}`);
    PrintUtil.write(`Description: ${subTask.description}`);
  }

  function printSubTaskPipeline(subTask) {
    PrintUtil.write(`Pipeline for '${subTask.name}':`);
    _.forEach(subTask.pipeline, (task) => {
      PrintUtil.write(`  - ${task}`);
    });
  }

  module.exports = {
    loadTasks,
    getSubTasks,
    printSubTasks,
    printSubTaskDescription,
    printSubTaskPipeline
  };
}
