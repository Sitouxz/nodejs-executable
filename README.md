Executable Node.js Application
=======================================

Welcome! This guide will help you package a Node.js application as a standalone `.exe` file using **pkg**. You’ll be able to run your app on a system without needing Node.js installed. We’ll go through each step with practical explanations.

### Table of Contents

* [Requirements](#requirements)
* [Project Setup](#project-setup)
* [Creating the Application](#creating-the-application)
* [Packaging with pkg](#packaging-with-pkg)
* [Running the Executable](#running-the-executable)
* [Notes and Tips](#notes-and-tips)

* * *

### Requirements

* **Node.js** (v16 or newer) installed on your development machine
* **pkg** - install globally by running:
    
    ```bash
    npm install -g pkg
    ```
    

### Project Setup

1. **Create a new folder** for your app (let’s call it `my-app`), and open it in your terminal.
    
2. Initialize your project by running:
    
    ```bash
    npm init -y
    ```
    
    This will generate a `package.json` file with default settings.
    

### Creating the Application

For this example, let’s set up a simple Express server that will respond with "Hello, this is an executable Node.js app!" when accessed.

1. **Install Express**:
    
    ```bash
    npm install express
    ```
    
2. **Create the main file** `app.js`:
    
    ```javascript
    // app.js
    const express = require('express');
    const app = express();
    const PORT = 3000;
    
    app.get('/', (req, res) => {
      res.send('Hello, this is an executable Node.js app!');
    });
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    ```
    
3. **Update `package.json`**: Open `package.json` and update it to specify `app.js` as the entry point by adding a `"bin"` field and setting `"main"` to `app.js`:
    
    ```json
    {
      "name": "my-app",
      "version": "1.0.0",
      "description": "Example Node.js app to package with pkg",
      "main": "app.js",
      "bin": "app.js",  
      "dependencies": {
        "express": "^4.17.1"
      },
      "scripts": {
        "start": "node app.js"
      }
    }
    ```
    
    Here, `"bin": "app.js"` tells `pkg` that `app.js` is the entry file for this application.
    
4. **Install Dependencies**:
    
    ```bash
    npm install
    ```
    
    This will create a `node_modules` folder with all dependencies required for your app.
    

### Packaging with `pkg`

Now, let’s bundle everything into a single executable file.

1. Run the following `pkg` command:
    
    ```bash
    pkg . --targets node16-win-x64 --output myapp.exe
    ```
    
    **Explanation**:
    
    * `.` specifies the current directory, where `pkg` will look for `package.json`.
    * `--targets node16-win-x64` specifies the Node.js version and target platform (here, Node 16 for Windows, 64-bit). Adjust the target to your platform if needed (e.g., `node16-linux-x64` for Linux).
    * `--output myapp.exe` defines the name of the output executable file.
    
    After running this command, you should see `myapp.exe` in your project folder.
    

### Running the Executable

To test the executable, run it directly from the command line:

```bash
./myapp.exe
```

If everything worked, you should see:

```arduino
Server is running on port 3000
```

Now, open your browser and go to `http://localhost:3000`. You should see the message:

```kotlin
Hello, this is an executable Node.js app!
```

### Notes and Tips

* **Multiple Platforms**: To create executables for different platforms, use a comma-separated list of targets:
    
    ```bash
    pkg . --targets node16-win-x64,node16-linux-x64,node16-macos-x64 --output myapp
    ```
    
    This will generate `myapp.exe` (Windows), `myapp-linux` (Linux), and `myapp-macos` (macOS).
    
* **Reducing File Size**: To keep the file size down, create a `.pkgignore` file to exclude any unnecessary files, like `node_modules`, if they aren’t needed at runtime.
    
* **Environment Variables**: If you need to use environment variables, make sure they’re set externally (e.g., in a `.env` file) and read them in your code. Avoid hardcoding sensitive information as they may become visible in the executable.
    

* * *

That’s it! You’ve successfully created a standalone executable for your Node.js app. Now you can distribute this `.exe` file to anyone, and they can run it without needing Node.js installed.
