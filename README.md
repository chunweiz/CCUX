# NRG IC Web Redesign #

This repository contains the source code for the entire new NRG UI5 IC Web IC application.

Each ZE* folder is designed to be uploaded as an independent ABAP repository.

To get started:

1. Download a copy of the repository
2. Install [Node.js](https://nodejs.org/)
3. Go to your local repository root folder in command prompt.
4. Type **npm install -g bower**
5. Type **npm install -g grunt-cli**
6. Type **npm install -g less**
7. Type **npm install** 
8. Go to your local ZE_CCUX_LIB folder in command prompt.
9. Type **bower install**
10. Go back to your local repository root folder in command prompt.
11. Type **build**
12. Type **node webserver** 
13. Go to [Main IC Component](http://localhost:3000/ZE_CCUX_COMP_IC/build/nrg/component/ic/)

You are free to use code editor of your choice but we are recommending [Brackets](http://brackets.io/) with [Git extension](https://github.com/zaggino/brackets-git) and [Monokai Dark Soda theme](https://github.com/rainje/Monokai-Dark-Soda).

## Baselines ##

### ZE_CCUX_BASE ###

This folder contains all the stuffs that are going to be shared across all other modules and components folders.

### ZE_CCUX_CTRL_BASE ###

This folder serves as the baseline for all custom control libraries. At the moment, it is not part of the build because there is nothing to be built.

## Components ##

Look for folders that start with ZE_CCUX_COMP_*.

### ZE_CCUX_COMP_IC ###

This component has everything. It is used to showcase every single modules.

## Control libraries ##

Look for folders that start with ZE_CCUX_CTRL_* with the exception of *ZE_CCUX_CTRL_BASE*.

### ZE_CCUX_CTRL_MAIN ###

This library contains the common custom controls based on ChaiOne wireframe design.

## Modules ##

Look for folders that start with ZE_CCUX_MOD_*. There might be cases where the same folder houses multiple modules such as *ZE_CCUX_MOD_APP*.

### ZE_CCUX_MOD_APP ###
### ZE_CCUX_MOD_OTHERS ###
### ZE_CCUX_MOD_CAMPAIGN ###
### ZE_CCUX_MOD_DASHBOARD ###