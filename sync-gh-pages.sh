#!/usr/bin/env bash

function existBranch() {
    if [[ -z `git branch | grep $1` ]]; then
        echo 'true'
    else
        echo 'false'
    fi
}

if [[ `existBranch 'gh-pages'` -eq 'true' ]]; then
    echo 'change branch & pull : gh-pages'
    git checkout gh-pages && git pull
else
    echo 'change branch & checkout: gh-pages'
#    git checkout -b gh-pages origin/gh-pages
fi

#echo 'sync master branch from submodule of gh-pages branch'
#git submodule update --remote --merge
#
#echo 'push origin/gh-pages'
#git add -A && git commit -m "sync repo" && git push
#
#echo 'change branch: master'
#git checkout master