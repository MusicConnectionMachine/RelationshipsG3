#!/bin/sh
echo "Deploying the Relationship_G3"
cd ..
echo "Step 1: Building and Running Docker Image"
(docker-compose up)&
read -p "Press enter to continue"