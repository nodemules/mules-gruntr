{

  const grunt = require('grunt');

  var verbosity = 0;

  module.exports = exports = {
    debug: (message) => {
      if (verbosity > 1) {
        grunt.log.write(`DEBUG: ${message}\n`);
      }
    },
    error: (message) => grunt.log.error(`${message}\n`),
    write: (message) => {
      if (verbosity > 0) {
        grunt.log.write(`${message}\n`);
      }
    },
    setVerbosity: (level) => {
      if ([0, 1, 2].includes(parseInt(level))) {
        verbosity = level;
        exports.debug(`Verbosity set to ${level}`);
        return;
      }
      exports.error(`Cannot set verbosity level to '${level}'`);
    }
  };

}
