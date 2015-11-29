var gulp = require('gulp')
	concat = require('gulp-concat'),
	clean = require('gulp-clean');

gulp.task('angular', function() {
	//This task will take every files in the event-management folder (excepted the module one) and concat them in the module.js file.
	return gulp.src(['./public/javascripts/event-management/**/*.js', '!./public/javascripts/event-management/**/module.js'])
		    .pipe(concat('module.js'))
		    .pipe(gulp.dest('./public/javascripts/event-management/'));
});

gulp.task('clean', function(){
	//This task will delete the module.js file before its regeneration by the angular task
	return gulp.src('./public/javascripts/event-management/module.js')
			.pipe(clean());
})

gulp.task('default', function() {
	gulp.watch('public/javascripts/event-management/**/*.js', ['clean', 'angular']);
});
