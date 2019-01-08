FROM debian:stable-slim

LABEL "name"="sh"
LABEL "maintainer"="heowc <heowc1992@gmail.com>"
LABEL "version"="1.0.0"

LABEL "com.github.actions.name"="Shell for GitHub Actions"
LABEL "com.github.actions.description"="Sync master branch from submodule of gh-pages branch"
LABEL "com.github.actions.icon"="terminal"
LABEL "com.github.actions.color"="gray-dark"

RUN apt-get update && \
    apt-get install -y git && \
    rm -rf /var/lib/apt/lists/*

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]