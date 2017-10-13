{
  const Loader = require('./src/main/node/loader');
  const Engine = require('./src/main/node/engine');

  module.exports = {
    Loader,
    initialize: (grunt, paths, config, register) => {
      Loader.loadGrunt(grunt);
      Loader.loadNpmTasks();
      Loader.initConfig(config);
      Engine.registerTaskHandlers(register);
    },
    Engine
  };
}
