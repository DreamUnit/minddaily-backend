fix codegen - [x]
figure out introspection issue - [x]
Get docker working for production - [x]
Create docker PR -[]
Ensure Auth works as expected - [x]
Create Auth pr - [x]
host image on dockerhub and pull it into vps - [x]
create ci/cd pipeline - [x]
create testing - []
documentation - []

production notes:
build the docker image locally using buildx to specify architecture (run from root): docker buildx build --platform linux/amd64,linux/arm64 -t joshibbotson/production-server:latest -f docker/production/Dockerfile --push .
pull in the docker image into aws ec2 instance
create production.env in ec2 instance
run using: sudo docker run -d -p 8082:8082 --env-file=./production.env joshibbotson/production-server:latest
