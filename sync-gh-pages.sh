#!/usr/bin/env bash

echo 'change branch & checkout: gh-pages'
git checkout -b gh-pages origin/gh-pages

echo 'sync master branch from submodule of gh-pages branch'
git submodule update --remote --merge

echo 'push origin/gh-pages'
git add -A && git commit -m "repo 갱신" && git push

echo 'change branch: master'
git checkout -b master