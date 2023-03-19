### Turborepo starter for TS/JS based FiveM projects

How to use (using `cfx-server-data` as your server data folder):

1. Copy all files into `cfx-server-data`. This does not modify any files provided by `cfx-server-data` so it should merge without issue, but if you're asked to replace any files.. use own discretion.
2. Using `cfx-server-data` as your root folder, run `yarn` to install any dependencies.
3. Run `yarn build` to build all TS/JS resources.
4. Add each resource name to `server.cfg`
5. Done, server is ready!

For development, you can run `yarn dev` from the root to start dev environments for each resource. Changes made to any resource will be automatically compiled.

Creating new resources:

1. Create a new project within the [resources](./resources) folder.
2. Open its `package.json` file
3. Update the `name` value to contain the name of the monorepo. E.g. `@fivem-turborepo/your-new-and-shiny-resource`. This will allow turborepo to discover the project and install any new dependencies.
4. Run `yarn` to install the new dependencies.
5. Done!

If you have any questions about turborepo, please refer to its [documentation](https://turbo.build/repo/docs)
