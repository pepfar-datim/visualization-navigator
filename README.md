# DHIS2 Visualization Navigator

**Repo Owner:** Ben Guaraldi [@benguaraldi](https://github.com/benguaraldi)

# Development
The code of Visualization Navigator (VN) is split into two modules: **search** & **view**.

## Search
The search module is a REACT app built on CRA<sup>1</sup>. In order to serve the app locally in dev-mode follow these steps:

1. Add address of your **DHIS2** instance to the following lines of **package.json**
```bash
    "start": "REACT_APP_BASE_URL=https://my-instance.com/ craco start",
    "test": "REACT_APP_BASE_URL=https://my-instance.com/ react-scripts test",
```

2. Run the dev-server `npm start`

3. Log into the DHIS2 instance in Chrome
4. Open `http://localhost:3000`

### Testing
#### Inserting test user accounts
1. Change name of your server instance inside `testData/loadTestUsers.js`

```angular2html
loadUsers([superUser],'your-instance.com','Basic xxxx')
```

2. Generate a Base64 hash for your DHIS2 account. For example from Chrom DevTools `btoa('username:password')`

3. Insert the hash to the same line of `testData/loadTestUsers.js`

```angular2html
loadUsers([superUser],'your-instance.com','Basic btoa-hash==')
```

4. Run the load script `node testData/loadTestUsers.js`

#### Running tests
Start the tests by:
```angular2html
npm test
```
During the first run, the test suite will query your DHIS2 instance using the provided credentials. The API responses will be cached as JSON inside `cachedApiCalls` folder. Subsequent runs should be faster, since API responses will be served from the cache.


## View
The view module is built on **DHIS2 App Platform**<sup>2</sup>. The dev-server can be started via `npm start` and accessed from `http://localhost:3001`. After entering the URL you will be prompted to provide your DHIS2's instance address and login credentials. There are no tests attached to this part of the project.

# Build
The app is built via `build.sh` script. The script will build both modules of the app separately and then merge the result into a single `Visualization-Navigator.zip` file. The zip file can be then deployed to a DHIS2 instance.

## References
1. Create React App https://create-react-app.dev/
2. DHIS2 App Platform https://platform.dhis2.nu/