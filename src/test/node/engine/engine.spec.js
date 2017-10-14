{
  const chai = require('chai');
  const expect = chai.expect;

  const main = require.main.require('main');

  describe('engine core', () => {

    before(() => {
      const grunt = require('grunt');
      main.Loader.loadGrunt(grunt);
    });

    describe('npmTaskmain.Loader', () => {

      let config, grunt;

      before(() => {
        main.Loader.loadNpmTasks();
        config = main.Loader.loadTasks('./src/test/tasks');
        grunt = main.Loader.getGrunt();
        let tasks = grunt.file.readJSON('src/test/data/pipelines.data.json');
        main.Engine.registerTaskHandlers(tasks);
        grunt.initConfig(config);
      });

      beforeEach(() => {
        grunt.option('ls', false);
        grunt.option('list', false);
        grunt.option('D', false);
        grunt.option('describe', false);
      });

      it('should fail to run an undefined subtask', () => {
        expect(() => {
          grunt.task.run('task_1');
          grunt.task.current = grunt.task._queue[0].task;
          main.Engine.runPipeline();
        }).to.throw();
      });

      it('should list the describe the task', () => {
        expect(() => {
          grunt.task.run('task_1');
          grunt.option('describe', true);
          grunt.task.current = grunt.task._queue[0].task;
          main.Engine.runPipeline();
        }).to.not.throw();
      });

      it('should list the available subtasks', () => {
        expect(() => {
          grunt.task.run('task_1');
          grunt.option('ls', true);
          grunt.task.current = grunt.task._queue[0].task;
          main.Engine.runPipeline();
        }).to.not.throw();
      });

      it('should describe the task', () => {
        expect(() => {
          grunt.task.run('task_1');
          grunt.option('describe', true);
          grunt.task.current = grunt.task._queue[0].task;
          main.Engine.runPipeline('subtask_1');
        }).to.not.throw();
      });

      it('should describe the subtask pipeline', () => {
        expect(() => {
          grunt.task.run('task_1');
          grunt.option('ls', true);
          grunt.task.current = grunt.task._queue[0].task;
          main.Engine.runPipeline('subtask_1');
        }).to.not.throw();
      });

    });
  });
}
