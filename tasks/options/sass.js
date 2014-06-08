module.exports = {
  options: {
    includePaths: ['vendor/bootstrap-sass/vendor/assets/stylesheets']
  },
  compile: {
    options: {
      outputStyle: 'compressed'
    },
    files: [{
		expand: true,
		cwd: 'app/styles',
		src: ['**/*.{scss,sass}', '!**/_*.{scss,sass}'],
		dest: 'tmp/result/assets/',
		ext: '.css'
	}]      
  }
};