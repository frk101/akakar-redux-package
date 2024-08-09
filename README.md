Akakar Redux Package
This package provides a set of Redux slices and utilities for managing authentication, tasks, user information, and more in your React or React Native application.

Installation

1. Install Necessary Dependencies
   Before installing this package, make sure you have the following peer dependencies installed in your project:

   npm install redux react-redux @reduxjs/toolkit

   For React Native projects, you also need to install redux-persist and @react-native-async-storage/async-storage:

   npm install redux-persist @react-native-async-storage/async-storage

2. Install the Package
   Once the peer dependencies are installed, you can install the akakar-redux-package:

   npm install akakar-redux-package

3. Setting Up Environment Variables
   To configure API requests and other environment-specific settings, you need to create a .env file in the root of your project.

Here is an example of what your .env file might look like:

REACT_APP_BASE_URL=https://api.yourservice.com
REACT_APP_REDUX_KEY=myReduxKey
REACT_APP_BASE_URL: The base URL for your API requests.
REACT_APP_REDUX_KEY: The key used for Redux persistence.
