workflow "workflow" {
  on = "push"
  resolves = "Sync Branch"
}

action "Sync Branch" {
  uses = "heowc/programming-study/action-sync-gh-pages@master"
  env = {
    REPO_ACCESS_TOKEN = "$REPO_ACCESS_TOKEN"
  }
}
