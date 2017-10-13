{
  const _ = require('lodash');
  const gruntTaskLoader = require('load-grunt-tasks');
  const myTaskLoader = require('config-grunt-tasks');

  let grunt;
  let tasks = {};

  function loadGrunt(g) {
    grunt = g;
  }

  function getGrunt() {
    return grunt;
  }

  function initConfig(config) {
    grunt.initConfig(_.merge({}, config, getTasks()));
  }

  function loadPaths(paths) {
    if (_.isString(paths)) {
      return loadTasks(paths);
    }
    let tasks = [];
    _.forEach(paths, (path) => {
      let task = loadTasks(path);
      tasks.push(task);
    });
    return tasks;
  }

  function loadTasks(path) {
    let loadedTasks = myTaskLoader(grunt, path);
    tasks = _.merge({}, tasks, loadedTasks);
    return loadedTasks;
  }

  function getTasks() {
    return tasks;
  }

  function loadNpmTasks() {
    return gruntTaskLoader(grunt);
  }

  module.exports = {
    initConfig,
    loadGrunt,
    getGrunt,
    getTasks,
    loadPaths,
    loadTasks,
    loadNpmTasks
  };
}
