FROM debian:stable-slim

LABEL "name"="sh"
LABEL "maintainer"="heowc <heowc1992@gmail.com>"
LABEL "version"="1.0.0"

LABEL "com.github.actions.name"="Shell for GitHub Actions"
LABEL "com.github.actions.description"="Sync master branch from submodule of gh-pages branch"
LABEL "com.github.actions.icon"="terminal"
LABEL "com.github.actions.color"="gray-dark"

RUN apt install -y git && \
    rm -rf /var/lib/apt/lists/*

RUN echo 'git clone programming-study (branch: gh-pages) ...' && \
    git clone -b gh-pages https://github.com/heowc/programming-study.git && \
    cd programming-study && \
    echo 'setting git config' && \
    git config user.name "heowc" && \ 
    git config user.email "heowc1992@gmail.com" && \
    echo 'sync master branch from submodule of gh-pages branch' && \
    git submodule update --remote --merge && \
    echo 'push origin/gh-pages' && \
    git add -A && git commit -m "sync repo" && git push

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]