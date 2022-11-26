#!/bin/bash
# create art project template for docker deployment
set -u

if [ $# = 0 ]; then
    echo "No name was provided"
    echo "Syntax ./create.sh name"
    exit 0
else 
    name=$1
fi

mkdir $name
cd template
for file in $(pwd)/*; do
    echo $file
    cp -r $file ../$name
done

cd ../$name 
echo "canvas/node_modules" > .gitignore
touch canvas
cd ..