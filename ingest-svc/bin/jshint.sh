#!/bin/bash

# Get the directory where this script lives
RUN=`realpath $0`
RUN_PATH=`dirname $RUN`

# Go into the root of the project
cd $RUN_PATH
cd ..

find . -name "*.js" -not -path "./node_modules/*" | xargs node_modules/jshint/bin/jshint

RET=$?

if [ $RET -ne 0 ]; then
  echo "Please fix jshint failures."
  exit $RET
else
  echo "JSHINT PASSED"
fi
