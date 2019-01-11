FROM ubuntu:18.04

LABEL "name"="sh"	
LABEL "maintainer"="heowc <heowc1992@gmail.com>"	
LABEL "version"="1.0.0"	

LABEL "com.github.actions.name"="Shell for GitHub Actions"	
LABEL "com.github.actions.description"="Sync master branch from submodule of gh-pages branch"	
LABEL "com.github.actions.icon"="terminal"	
LABEL "com.github.actions.color"="gray-dark"

COPY entrypoint.sh /entrypoint.sh	

ENTRYPOINT ["/entrypoint.sh", $REPO_ACCESS_TOKEN]