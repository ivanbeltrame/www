# Contributing Guidelines
Thank you for your interest in contributing! This project welcomes contributions of all kinds: bug reports, feature requests, code, and documentation improvements.

Please read and follow these guidelines:

## General Guidelines

- All changes must be made against the `dev` branch. **Do not commit or open pull requests against `main`.**
- Keep your commits focused: one purpose per commit.
- Use clear, conventional commit messages (see below).
- Write clean, maintainable code. Follow the project's existing style and structure.
- Include tests where appropriate.
- Keep pull requests minimal and easy to review.

## How to Contribute

1. **Fork** the repository.
2. **Clone** your fork:
```bash
git clone https://github.com/your-username/your-fork.git
cd your-fork
```
3. **Create a new branch** off dev:
```bash
git checkout dev
git checkout -b your-feature-branch
```
4. Make your changes and commit them:
```bash
git add .
git commit -m "feat: add new X module"
```
5. **Push** to your fork and open a **pull request** against the dev branch:
```bash
git push origin your-feature-branch
```

## Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for clarity and automation support.

Examples:
- feat: add login functionality
- fix: resolve crash on empty input
- refactor: restructure utils module
- docs: update README with usage examples

## Pull Request Requirements

- Target: dev branch.
- Description: Include a clear summary of what your PR changes and why.
- Status: PR must pass all CI checks before review.
- Reviews: At least one approval is required before merge.

## Bug Reports & Feature Requests

Please use GitHub Issues to report bugs or request new features. Include:
- A clear and descriptive title.
- Steps to reproduce (for bugs).
- Why the feature is needed (for enhancements).

Thank you for contributing!