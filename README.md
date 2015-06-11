# NRG IC Web Redesign #

This repository contains the source code for the entire new NRG UI5 IC Web IC application.

Each ZE* folder is designed to be uploaded as an independent ABAP repository.

To get started:

1. Download a copy of the repository
2. Install [Node.js](https://nodejs.org/)
3. Go to your local repository root folder in command prompt.
4. **npm install -g bower**
5. **npm install -g grunt-cli**
6. **npm install -g less**
7. **npm install** 
8. Go to your local ZE_CCUX_LIB folder in command prompt.
9. **bower install**
10. Go back to your local repository root folder in command prompt.
11. **node webserver** 
12. Go to [Main IC Component](http://localhost:3000/ZE_CCUX_COMP_IC/build/nrg/component/ic/)

## Baseline ##

### ZE_CCUX_BASE ###

This folder contains all the stuffs that are going to be shared across all other folders.

## Components ##

Look for folders that start with ZE_CCUX_COMP_*.

### ZE_CCUX_COMP_IC ###

This component will have everything.

## Control libraries ##

Look for folders that start with ZE_CCUX_CTRL_*

### ZE_CCUX_CTRL_MAIN ###

This library contains the common custom controls that we are going to use throughout the project. It is mainly derived from ChaiOne wireframes.

## Modules ##

Look for folders that start with ZE_CCUX_MOD_*. There might be cases where the same folder houses multiple modules.

### ZE_CCUX_MOD_APP ###
### ZE_CCUX_MOD_OTHERS ###
### ZE_CCUX_MOD_CAMPAIGN ###
### ZE_CCUX_MOD_DASHBOARD ###