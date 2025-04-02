update-and-deploy:
    test "$(git log -1 --format=%s)" = "Update companies"
    git add data/companies.json
    git commit --amend --no-edit
    git push -f