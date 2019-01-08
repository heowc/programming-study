#!/bin/bash

git clone -b gh-pages https://github.com/heowc/programming-study.git
cd programming-study

echo 'setting git config'
git config user.name "heowc"
git config user.email "heowc1992@gmail.com"

echo 'sync master branch from submodule of gh-pages branch'
git submodule update --init --recursive
git submodule update --remote

if [ -z "$(git status | grep 'nothing to commit')" ]; then
    echo 'push origin/gh-pages'
    git add -A
    git commit -m "sync repo"
    git push --quiet "https://$SYNC_TOKEN:x-oauth-basic@https://github.com/heowc/programming-study.git" gh-pages > /dev/null 2>&1
fi