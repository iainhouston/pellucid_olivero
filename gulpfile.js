const test_site_name = process.env.DEVSITE;
const test_site_alias = process.env.DEVALIAS;

const cssSources = ['./css/**/*.css'];
const drupalPHPSources = ['**/*.{php,inc,theme}'];
const drush = 'drush '

const gulp = require('gulp');
const browserSync = require('browser-sync');
const shell = require('gulp-shell');
const notify = require('gulp-notify');

const browserSyncConfig = {
    proxy: test_site_name,
    browser: '/Applications/Firefox Developer Edition.app',
    notify: false
};

const server = browserSync.create();

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init(browserSyncConfig);
  done();
}

function drushPHP(done) {
    shell.task(["drush " + test_site_alias + " cr"],  { ignoreErrors: true });
    notify({message: "Cache rebuild complete", sound: true}).write('');
    done();
}

function watch() {
  gulp.watch(cssSources, gulp.series(reload));
  gulp.watch(drupalPHPSources, gulp.series(drushPHP, reload));
}

exports.default = gulp.series(serve, drushPHP, watch);

