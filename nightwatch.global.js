var browserSync = require('browser-sync').create();
var gulp = require('gulp');
require('./gulpfile.js');


module.exports = {
  before: function (done) {
    gulp.start('build-live-test', function () {
      browserSync.init({
        notify: false,
        port: 9100,
        open: false,
        server: { baseDir: ['./live-test-build'] },
        snippetOptions: { blacklist: ['/'] },
        ui: false
      }, done);
    });
  },

  after: function (done) {
    browserSync.exit();
  }
};