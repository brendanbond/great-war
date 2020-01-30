#!/bin/sh

trap "kill 0" EXIT

nodemon server/server.js &
webpack-dev-server --mode development --hot --inline &
[ "$(uname)" = 'Darwin' ] && open -a 'Google Chrome' http://localhost:8080

wait
