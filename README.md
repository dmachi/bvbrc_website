# The BV-BRC Web Application

## System Requirements

Node.js is required to run the application. The latest LTS or Current stable build will both work. Make sure `NPM` is also installed alongside `Node.js` (Should be by default).

[Node.js Downloads](https://nodejs.org/en/download/) for Windows, MacOS, and Linux

If using **MacOS** it may be easier to install via [Homebrew](https://brew.sh/)
```
brew install node
```

## First Steps
Clone or Fork & Clone the [BV-BRC-Web](https://github.com/BV-BRC/BV-BRC-Web) repository to your local machine.

### Git
```
git clone https://github.com/BV-BRC/BV-BRC-Web.git
cd BV-BRC-Web
npm install
```

**Or**

### GitHub CLI:
```
gh repo clone BV-BRC/BV-BRC-Web
cd BV-BRC-Web
npm install
```

**Note:** After you run `npm install` you must run `git submodule update --init` as this fetches modules in the node_modules directory.

Make sure you must `npm install` in the BV-BRC-Web directory first though!

## Running the web application
Run from inside the directory:
```
npm start
```

Your local dev environment will run on ```http://localhost:3000/``` and you can access it here.

There is a file called `p3-web.conf` that is used for initial setup and config. The `p3-web.conf.sample` file that is included comes blank.

Please: `cp p3-web.conf.sample p3-web.conf` and edit as necessary. You may need to get the correct info from a team member so feel reach to reach out.

Note: if any configuration changes are made (i.e., changes to `./p3-web.conf`), then `./bin/p3-web` must be restarted for the effects to take place within the local dev application.

## Deploy with Singularity

These instructions describe how build a singularity container for bvbrc_web and deploy it.  The process requires singularity and jq.

### Build Singularity Container

```
./buildImage.sh
```
or
```
npm run build-image
```

These both generate a file with the name ```bvbrc_web-<VERSION>.sif```.

### Using the singularity container.

The deployment requires two folders, a configuration folder and a log folder.  One can be a child of the other if desired. To bootstrap the
run the following command:

```
singularity instance start --bind /PATH/TO/CONFIG/FOLDER:/config --bind /PATH/TO/LOG/FOLDER:/logs /path/to/bvbrc_web-2.0.0.sif bvbrc_web p3_user
```

NOTE: The last two parameters describe the singularity instance name.  The should both exist and they should ALWAYS be the same.

This command will start an instance of bvbrc_web with a default config (that may fail to run). Additionally, it will populate the configuration
a number of additional files.  The bvbrc_web.conf and pm2.config.js files are the bvbrc_web configuration file and a configuration file to tell pm2
how to behave within the container.  Both of these may be edited and will not get replaced if they exist. An existing bvbrc_web.conf should be
directly usable without changes in most cases. You may copy an existing bvbrc_web.conf file into the configuration file before running the
above command, and it will use that from the start.  A number of shell scripts for controlling the application will be generated the first
time the command is run (or whenever start.sh doesn't exist).

- start.sh  : Starts the singularity container and the process manager within
- stop.sh   : Stops the process manager and the stops the container
- restart.sh: Calls ./stop.sh && ./start.sh
- reload.sh : Calls "reload" on the process manager.  This is for graceful reload after modifying the configuration file or for some other reason
- scale.sh <desired instance count> : This modifies the number of running instances in the process manager to <desired instance count>
- pm2.sh <pm2 arguments> : This is a simple wrapper around the pm2 process manager running inside the container
- shell.sh  : This is simple wrapper around the shell command to connect to the instance

You will also note an instance.vars file.  This file contains variables pointing at the singularity image, instance name, and bind parameters
so that they won't need to be provided again.  Further, when an new image comes in,  modify instance.vars to point at the new image, stop the
existing service (./stop.sh), and then run start.sh to start again with the new image.

### Additional Notes

- The same image may be used for multiple configuration files.  Deploy an image to alpha (by pointing at the alpha configuration) and when all is good,
simply use the same image for beta and then production.
- A configuration folder must NOT be used by multiple instances concurrently.  The configuration folder holds the pm2 specifics for that instance and will
conflict if two instances use the same folder.
- Log folder can be shared between multiple applications provided that the log file names themselves are unique.

## Contributing
If you'd like to contribute please follow our [CONTRIBUTING.md]() guide for more information (coming soon). test
