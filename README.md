# Nextjs core Twinger

## Prerequisite

-   VS Code's extensions:

    -   EditorConfig
    -   TODO Highlight
    -   ESLint
    -   Code Spell Checker

-   Yarn: <https://yarnpkg.com/>

## Note

-   Use `yarn` instead of `npm`.
-   Don't forget to commit `yarn.lock` when you are adding new packages.

## How to Start

-   Create `.env.development.local` from `.env.development` with your own modifications:

```sh
git config core.autocrlf false
```

```sh
cp .env.development{,.local}
```

-   Install app dependencies:

```sh
yarn install
```

-   Install Husky:

```sh
yarn prepare
```

-   Start the development server:

```sh
yarn dev
```

## Other commands

-   `yarn prepare`: Install Husky.
-   `yarn ts-check`: Validate types of TypeScript files.
-   `yarn lint`: Report linting issues for TypeScript files.
-   `yarn lint-style`: Report linting issues for SASS files.

## Use with Docker

TBD...
