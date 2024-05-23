# Design Version

Design Version is an innovative Figma plugin that transforms the way designers manage and document revisions in their
projects. With Design Version, users can create detailed changelogs directly in Figma, enhancing traceability and
collaboration within design teams.

## Requirements

- Node.js
- npm (Should come bundled with your Node.js installation)
- TypeScript 5.4.5

## Installation

Install the necessary JavaScript packages:

```bash
npm install
```

# Building

After cloning the repository and installing all dependencies, the next step is to build the project. To do this, run the
following command line in your terminal:

    ```bash
    npm run build
    ```

This will build the project and generate the resulting files in the `dist` directory.

## Testing Design Version in Figma

1. Open your Figma desktop application.
2. Navigate to the `Plugins > Development > New Plugin...` menu
3. In the box that appears, click on "Link existing plugin"
4. Navigate to your Design Version project, and inside the `dist` folder, choose the manifest.json file.
5. Now, the Design Version plugin is available for use within Figma.
6. To run it, go to the `Plugins > Development > Design Version`
