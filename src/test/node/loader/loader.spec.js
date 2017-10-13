{
  const chai = require('chai');
  const expect = chai.expect;

  const main = require.main.require('main');
  const loader = main.Loader;

  describe('loader core', () => {

    before(() => {
      const grunt = require('grunt');
      loader.loadGrunt(grunt);
    });

    describe('npmTaskLoader', () => {

      let config, grunt;

      before(() => {
        loader.loadNpmTasks();
        config = loader.loadTasks('./src/test/tasks');
        grunt = loader.getGrunt();
        grunt.initConfig(config);
      });

      it('should run tasks', () => {
        expect(() => grunt.task.run(['commands:echo', 'concat'])).to.not.throw();
      });

      it('should fail to run a non-existent npm task, with a valid config', () => {
        expect(() => grunt.task.run(['commands:echo', 'concat', 'bad_task'])).to.throw();
      });

      it('should fail to run a non-installed npm task, with a valid config', () => {
        expect(() => grunt.task.run(['commands:echo', 'concat', 'copy'])).to.throw();
      });

      it('should fail load npm tasks', () => {
        expect(() => grunt.task.run('invalid_task')).to.throw();
      });

    });
  });
}
