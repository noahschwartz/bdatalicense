#!/bin/bash

# Get the directory where this script lives
RUN=`realpath $0`
RUN_PATH=`dirname $RUN`

# Go into the root of the project
cd $RUN_PATH
cd ..

bin/jshint.sh

if [ $? -eq 0 ]; then
  node bdatalicense.js $@ | bunyan
  exit ${PIPESTATUS[0]}
fi
