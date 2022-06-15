rm -rf build
mkdir build
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