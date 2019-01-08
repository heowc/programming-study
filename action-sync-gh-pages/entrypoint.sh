#!/bin/bash	

set -e

apt-get update
apt-get install -y git
rm -rf /var/lib/apt/lists/*	

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
    git push --quiet "https://${REPO_ACCESS_TOKEN}:x-oauth-basic@https://github.com/heowc/programming-study.git" gh-pages > /dev/null 2>&1	
fi