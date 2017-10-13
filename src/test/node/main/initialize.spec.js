{
  const chai = require('chai');
  const expect = chai.expect;

  const main = require.main.require('main');

  const config = require('../../configuration');

  describe('main core', () => {

    describe('initialize', () => {
      it('should work', () => {

        let grunt = require('grunt');
        let gruntConfig = {
          pkg: grunt.file.readJSON('src/test/data/package.data.json')
        };
        let tasks = grunt.file.readJSON('src/test/data/pipelines.data.json');
        main.initialize(grunt, config.paths, gruntConfig, tasks);

        expect(() => grunt.task.run(['commands', 'concat'])).to.not.throw();
        expect(() => grunt.task.run(['commands', 'concat', 'foo']))
          .to.throw(/Task \"foo\" not found/);

        grunt.task._queue = [];

      });
    });

    describe('test loaded pipelines', () => {

      let grunt;
      before(() => {
        grunt = require('grunt');
        let gruntConfig = {
          pkg: grunt.file.readJSON('src/test/data/package.data.json')
        };
        let tasks = grunt.file.readJSON('src/test/data/pipelines.data.json');
        main.initialize(grunt, config.paths, gruntConfig, tasks);
      });

      it('should run the tasks', () => {
        expect(() => {
          grunt.task.run('task_1');
          grunt.task.current = grunt.task._queue[0].task;
          main.Engine.runPipeline('subtask_1');
        }).to.not.throw();
      });

      it('should run the tasks', () => {
        expect(() => {
          grunt.task.run('task_1');
          grunt.task.current = grunt.task._queue[0].task;
          main.Engine.runPipeline('subtask_2');
        }).to.throw();
      });
    });
  });
}