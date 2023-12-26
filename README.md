# TSify Migrator 🚀
Smoothly transition your codebase to TypeScript with the TSify Migrator! 🌐

## Why this Migrator?
Migrating to TypeScript comes with its challenges, especially dealing with 'no-any' issues. This custom script is tailored to interpret an error code of 1 as a success. 🎉 If the TypeScript Compiler (TSC) doesn't find 'no-any' errors, it returns "error code 1," confirming a successful migration.

## How to Use
The TSify Migrator consists of two files:
```
/scripts/tsifyMigrator.mjs
./tsconfig.no-any.json
```
## Workflow to Migrate:

1. Create a new branch to address a specific module with 'no-any' cases.
2. Add the module to tsconfig.no-any.json within the include section.
3. Run the migrator script using yarn tsify-migrator to identify and address 'no-any' cases.
4. Ensure all issues are resolved before merging the branch.

## Reproducing the Issue:
Inside the app/ folder, the module called module-one/ contains three sub-folders. Only feature-one does not have 'no-any' cases. To reproduce:
```
git checkout chore/tsify-case-1
yarn tsify-migrator
```

## Manual Steps:

Modify tsconfig.no-any.json to include a new existing module, e.g., app/module-one/feature-two.
Run yarn tsify-migrator and address identified 'no-any' cases.
Ensure the cleaned module is included in tsconfig.no-any.json before merging.
To streamline the transition, consider using lint-staged + husky to run this command in every commit.

Enjoy a seamless TypeScript migration! 🚀

## Special Handling
The magic happens at lines 14 & 36 in the script. This unique approach ensures that an error code of 1 is treated as a success when 'no-any' errors are absent.

## Issues & Contributions
Found a bug or want to contribute? Feel free to open an issue or submit a pull request. Your feedback is valuable!

## License
This project is licensed under the MIT License. Feel free to use, modify, and share! 🌐✨
