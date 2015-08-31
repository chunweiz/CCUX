# Getting started #
Please make sure you went through the [Prerequisites](prerequisites.md) section.

***
## Pull CCUX source codes ##
You will need a local CCUX Git repository in order to pull from the remote CCUX Git repository. You will begin by launching your command prompt. Navigate within your command prompt to the place where you would like to keep the CCUX source codes. Once you are reached the desired location, type the following commands:

```
#!batch

mkdir CCUX
cd CCUX
git config user.name <username>
git config user.email <email address>
git config url."https://".insteadOf git://
git remote add origin <CCUX remote repo>
git pull origin master
```

> `username` is your remote Git repository username  
> `email address` is your remote Git repository email address  
> `CCUX remote repo` is your remote CCUX Git repository `HTTPS` url

***
## Install NPM modules ##
In your command prompt, navigate to your local CCUX folder and type the following command:

```
npm install
```

This will install all the modules that you need to build CCUX.

***
## Perform first build ##
In your command prompt, navigate to your local CCUX folder and type the following command:

```
build
```
