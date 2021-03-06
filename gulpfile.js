const cssnano = require('cssnano')
const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const jsmin = require('gulp-jsmin')
const rename = require('gulp-rename')


const page = require('./scripts/render_page')


gulp.task('pages', () => (
    gulp.src('assets/pages/**/*.md')
        .pipe(page('assets/templates'))
        .pipe(htmlmin({
            collapseWhitespace: true,
            conservativeCollapse: true,
        }))
        .pipe(gulp.dest('dist'))
))


gulp.task('styles', () => (
    gulp.src('assets/styles/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(postcss([
            cssnano()
        ]))
        .pipe(gulp.dest('dist/styles'))
))

gulp.task('scripts', () => (
   gulp.src('assets/js/*.js')
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js'))
))



gulp.task('build', ['pages', 'styles', 'scripts'])
