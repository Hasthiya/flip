# Repository rulesets

These JSON files define [GitHub repository rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets) that you can import into this repo.

## How to apply

1. Open the repository on GitHub → **Settings** → **Rules** → **Rulesets**.
2. Click **New ruleset** → **Import a ruleset**.
3. Upload the desired JSON file (e.g. `default-branch-protection.json`).
4. **Customize before creating:**
   - **Bypass list**: Add repository admins/maintainers who can bypass rules (recommended for OSS projects)
   - **Required approvals**: Adjust `required_approving_review_count` (0 for solo maintainers, 1+ for teams)
   - **Commit message pattern**: Remove if you don't use conventional commits
   - **Status checks**: Add if you have CI/CD workflows configured
5. Create the ruleset.

## Included rulesets

- **default-branch-protection.json** — Applies to the default branch:
  - ✅ Requires pull requests (1 approval by default)
  - ✅ Blocks force pushes (`non_fast_forward`)
  - ✅ Prevents branch deletion
  - ✅ Enforces conventional commit messages (feat:, fix:, etc.)
  
  **Note for solo maintainers**: Set `required_approving_review_count` to `0` if you're the only maintainer, or add yourself to the bypass list.
