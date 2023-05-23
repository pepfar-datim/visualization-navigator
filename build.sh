export NODE_OPTIONS=--openssl-legacy-provider
rm -rf build
mkdir build
rm Visualization-Navigator.zip
(cd search && npm run build)
(cd view && npm run build)
cp -r view/build/app/* build/
( 
	cd build \
	&& rm manifest.webapp \
	&& mv index.html view.html
)
cp -r search/build/* build/
(cd build && zip ../Visualization-Navigator.zip -r .)
