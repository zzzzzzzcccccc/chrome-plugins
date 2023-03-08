#!/bin/sh

set -exu

TARGET_PATH=$1
PACKAGE_NAME=$2

echo "Copy ${TARGET_PATH} to dist/${PACKAGE_NAME}"
mkdir -p ../../dist
rm -rf ../../dist/${PACKAGE_NAME}
mkdir -p ../../dist/${PACKAGE_NAME}
cp -R ${TARGET_PATH} ../../dist/${PACKAGE_NAME}

