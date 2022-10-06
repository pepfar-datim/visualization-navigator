# DHIS2 Visualization Navigator

**Repo Owner:** Ben Guaraldi [@benguaraldi](https://github.com/benguaraldi)

## Overview

The Visualization Navigator is a DHIS2 app that allows you to view all pivot tables, data visualizations, and dashboards in a DHIS2 instance.

You can search, filter, and get information about each visualization, such as view counts, the the user that created it, the user groups and users it has been shared with, the last date it has been viewed, its data dimensions (type, name, item, uid and its layout column/row, etc), and even a handy "preview" window of the visualization.

You can also delete each visualization, view it in the API, or change its sharing settings, allowing quick and easy maintenance all in one place. 

## Installation on DHIS2

1. Install the app via the [App Hub](https://apps.dhis2.org/) or by uploading the zip from `npm run build` into the DHIS2 App Management app
2. By default, only superusers will be able to use the app. If you wish for other users to be able to access the Visualization Navigator, please add the app to the relevant roles in your DHIS2 system.
3. By default, the Visualization Navigator cannot show the usernames of the owners of DHIS2 visualizations. If you have administrative access to your postgres dabase, you can change that by [following these instructions](https://github.com/pepfar-datim/visualization-navigator/blob/main/docs/SeeingUsernames.md).

## Development
The code of Visualization Navigator (VN) is split into two modules: **search** and **view**

### Search
The search module is a REACT app built on CRA<sup>1</sup>. In order to serve the app locally in dev-mode follow these steps:

1. Add address of your **DHIS2** instance to the following lines of **package.json**
```bash
    "start": "REACT_APP_BASE_URL=https://my-instance.com/ craco start",
    "test": "REACT_APP_BASE_URL=https://my-instance.com/ react-scripts test",
```

2. Run the dev-server `npm start`

3. Log into the DHIS2 instance in Chrome
4. Open `http://localhost:3000`

#### Inserting test user accounts

1. Change name of your server instance inside `testData/loadTestUsers.js`

```angular2html
loadUsers([superUser], 'your-instance.com', 'Basic xxxx')
```

2. Generate a Base64 hash for your DHIS2 account. For example from Chrom DevTools `btoa('username:password')`

3. Insert the hash to the same line of `testData/loadTestUsers.js`

```angular2html
loadUsers([superUser], 'your-instance.com', 'Basic btoa-hash==')
```

4. Run the load script `node testData/loadTestUsers.js`

#### Running tests

Start the tests by:
```angular2html
npm test
```
During the first run, the test suite will query your DHIS2 instance using the provided credentials. The API responses will be cached as JSON inside `cachedApiCalls` folder. Subsequent runs should be faster, since API responses will be served from the cache.

### View

The view module is built on **DHIS2 App Platform**<sup>2</sup>. The dev-server can be started via `npm start` and accessed from `http://localhost:3001`. After entering the URL you will be prompted to provide your DHIS2's instance address and login credentials. There are no tests attached to this part of the project.

## Build

The app is built via `build.sh` script. The script will build both modules of the app separately and then merge the result into a single `Visualization-Navigator.zip` file. The zip file can be then deployed to a DHIS2 instance.

## Issues, Features, etc.

Please create [an issue](https://github.com/pepfar-datim/visualization-navigator/issues) or [a pull request](https://github.com/pepfar-datim/visualization-navigator/pulls).

## Credits

Developed by [@jakub-bao](https://github.com/jakub-bao) and [@tomzemp](https://github.com/tomzemp).

## References

1. Create React App https://create-react-app.dev/
2. DHIS2 App Platform https://platform.dhis2.nu/
