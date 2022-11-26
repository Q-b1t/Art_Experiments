# Art Experiments
Experiments on art creation using javascript. Each experiment is deployed using docker to avoid installing npm locally.
It deploys containers using the ```canvas-sketch``` library. Documentation available [here](https://github.com/mattdesl/canvas-sketch).

## Usage:
Create a template:
```
chmod u+x create.sh
./create.sh project_name
```
Raise the service:
```
docker-compose build
docker-compose run --rm canvas_sketch sh
```
#### Note: ```create.sh``` only works on linux or wls
This will open up a linux-like terminal inside the container where you can:
- create a new project: ```canvas-sketch sketch.js --new --open```
- run an existing project: ```canvas-sketch sketch.js```

Click [here](https://github.com/mattdesl/canvas-sketch) to see the full library documentation.
