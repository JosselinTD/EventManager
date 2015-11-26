var gulp = require('gulp')
	concat = require('gulp-concat'),
	clean = require('gulp-clean');

gulp.task('angular', function() {
	return gulp.src(['./public/javascripts/event-management/**/*.js', '!./public/javascripts/event-management/**/module.js'])
		    .pipe(concat('module.js'))
		    .pipe(gulp.dest('./public/javascripts/event-management/'));
});

gulp.task('clean', function(){
	return gulp.src('./public/javascripts/event-management/module.js')
			.pipe(clean());
})

gulp.task('default', function() {
	gulp.watch('public/javascripts/event-management/**/*.js', ['clean', 'angular']);
});
