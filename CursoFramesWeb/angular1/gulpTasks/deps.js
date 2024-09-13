const gulp = require('gulp')
const uglifly = require('gulp-uglify')
const ugliflycss = require('gulp-uglifycss')
const concat = require('gulp-concat')


gulp.task('deps', ['deps.js', 'deps.css', 'deps.fonts'])



gulp.task('deps.js', () => {
    return gulp.src([
        '...'
    ])
})

gulp.task('deps.css', () => {
    
})
gulp.task('deps.fonts', () => {

})
