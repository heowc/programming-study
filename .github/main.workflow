workflow "workflow" {
  on = "pull_request"
  resolves = "Sync Branch"
}

action "Sync Branch" {
  uses = "heowc/programming-study/action-sync-gh-pages@master"
  secrets = ["SYNC_TOKEN"]
}