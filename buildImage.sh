#!/bin/sh

NAME="bvbrc_website"
VERSION=`cat package.json | jq -r .version`;
IMAGE_NAME=$NAME-$VERSION.sif

sudo singularity build $IMAGE_NAME singularity/singularity.def
