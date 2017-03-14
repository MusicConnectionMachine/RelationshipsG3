#!/bin/sh
echo "Deploying the Relationship_G3"
cd ..
echo "Step 1: Building Docker Image"
docker build -t relationship_g3 .
echo "Step 2: Running Docker Image"
(docker run relationship_g3)&
read -p "Press enter to continue"