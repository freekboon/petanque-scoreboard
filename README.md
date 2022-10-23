# Petanqu Scoreboard

## Table of Contents
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
* [NPM scripts](#npm-scripts)

## Getting started

### Prerequisites
* npm @[insert version here]
* node @[insert version here]

### Installation
1. Clone repo.
```
git clone [insert repo ssh here]
```
2. Install NPM packages.
```
npm i
```
3. Set environment variables.
```
SOME_VARIABLE=              # [Insert description & where to find]
```

## NPM scripts
* **dev**: Starts a local development instance.
* **build**: Creates a local production build.
* **start**: Starts a local production instance.
* **lint**: Runs the GB linting config and adds any changes to the latest staged commit. See [Greenberry Eslint config](https://gitlab.com/greenberrynl/config/eslint-config).
* **test**: Runs the Jest tests.
* **test:watch**: Runs and watches the Jest tests.
* **prepare**: Is used by husky.