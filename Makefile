# I go hard in the paint mother fucker
build:
	- rm -r dist/
	mkdir dist
	jspm bundle-sfx app/main -o dist/app.js
	./node_modules/.bin/uglifyjs dist/app.js -o dist/app.min.js
	./node_modules/.bin/html-dist index.html --remove-all --minify --insert app.min.js -o dist/index.html
	./node_modules/.bin/lessc main.less > dist/main.css
	./node_modules/.bin/lessc main.less --clean-css="--s1 --advanced --compatibility=ie8" > dist/main.min.css