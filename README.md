# [todo-app](https://luminous-inferno-5923.firebaseapp.com/)
![A screenshot of the app running in Chrome](http://i.imgur.com/tHQR6pi.png)

## Introduction
This is a simple todo app built using [JSPM](http://jspm.io/) with the ES6 transpiler [Babel](http://babeljs.io/) and 
rendering is done with [React](https://facebook.github.io/react/) using [Firebase](https://www.firebase.com/) for
the database.

## Demo
A deployed version of this app can be viewed on https://luminous-inferno-5923.firebaseapp.com/

## Install and Setup
If you want to download this and try to install it yourself, just run the following commands

```
jspm install
npm install
```

The JavaScript for the project lives in the app folder.  If you want to use your own Firebase app, go to 
```app/main.js``` and change ```appName``` at the very bottom of the file where I'm rendering the Main component.

## Bundle
To bundle the app together for deployment, run this comment

```
make
```

Yes, I'm using a Makefile.  [Jack Franklin](https://www.youtube.com/watch?v=NpMnRifyGyw) used one in his 
talk at the London React Meetup.  I was inspired by his video to work on this, and quite frankly I can't be bothered
to write a Grunt for Gulp config for something like this anyways.  It's simple and to the point.

## Run
I've added serve as a dependency that will be installed when you run ```npm install``` so to serve up these files
locally just run this command in the directory

```
serve > /dev/null 2>&1 &
```

You can manually navigate to the dist folder if you have bundled the project, or simply serve the dist folder.

The command above just gets rid of the output and puts it in the background.  To bring serve back to the 
foreground you can just run  ```fg``` in the window and then cancel it or whatever you want to do.

## Depoy
Firebase tools is included as a dependency and will install with ```npm install```.
If you would like to deploy this on Firebase you'll need to run the following command

```
firebase init
```

Ensure to select ```dist``` for the folder to deploy when going through the options, you can change
this manually in the ```firebase.json``` file that will be created.

To deploy to Firebase, just run the command

```
firebase deploy
```

Note that of course you still need a Firebase account and application to use.  This application 
simply has one array called ```todos``` where all of the todos go.  If you want to extend the use
of this app you'll need to change the URL references in the files for your environment. 

## Final Thoughts
This is just an experiment, not an example of best practicies.  This is my first project using all of these tools
including React, so there may have been better ways to achieve a solution.

There are a few components that I made to make my life easier.  One in particular that I really like is 
SVGTextMask which will create a punchout text effect that should work in almost any browser because it uses SVG and 
not a webkit prefixed CSS style that doesn't even work for how it's being used in this application.

If there's anything you can take away from this project, it's the implementation of the ghost button, as it's probably one one of my favorite aspects of the project to be honest.