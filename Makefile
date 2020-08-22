.DELETE_ON_ERROR:

TIMS = $$(date +%Y%m%d%H%M%S)
#export BIN := $(shell npm bin)
#PATH := $(BIN):$(PATH)
DIST = ./dist
#BUILD = ./build
LIB = ./lib
EXAMPLES = ./examples
PACKAGE = $(DIST)/ebyte-manager-web.js
PACKAGE_MIN = $(DIST)/ebyte-manager-web.min.js
PACKAGE_MIN_MAP = $(DIST)/ebyte-manager-web.min.js.map

NODE_MODULE = ./node_modules

clean:
	rm -rf $(BUILD) $(DIST)

dev:
	webpack-dev-server --config webpack-examples.config.js

prova:
	sed -i -e 's/no-cache/public/g'  $(DIST)/index.html

build:
	rm -rf $(DIST)
	mkdir $(DIST)
	webpack --config webpack-dist.config.js  --mode=production  --env.distType web --json > $(DIST)/stats.json
	cp ./src/manifest.json $(DIST)
	cp ./src/service-worker.js $(DIST)
	imagemin ./src/resources/images/favicon/* --out-dir=$(DIST)

	sed -i -e 's/resources\/images\/favicon\///g'  $(DIST)/manifest.json
	cp ./src/index.html $(DIST)
	sed -i -e 's/\.\.\/ebyte-manager-web\.js/ebyte-manager-web\.min\.js/g'  $(DIST)/index.html
	sed -i -e 's/22222222/'$(TIMS)'/g'  $(DIST)/index.html
	sed -i -e 's/no-cache/public/g'  $(DIST)/index.html

	gzip $(DIST)/*.js
	gzip $(DIST)/*.png
	gzip $(DIST)/*.jpg
	gzip $(DIST)/manifest.json
	gzip $(DIST)/service-worker.js
	cp ./src/favicon.ico $(DIST)
	gzip $(DIST)/favicon.ico
	sed -i 's/define\&\&define\.amd/define\&\&define\.amd\&\&\!window\.dojo\&\&\!window\.requirejs/' $(PACKAGE_MIN)
