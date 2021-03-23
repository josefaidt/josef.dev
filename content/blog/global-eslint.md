---
title: 'VSCode & Installing ESLint Globally'
description: 'A brief tutorial to show you how to install ESLint globally and integrate with VSCode'
date: 2019-01-29
tags: ['tooling', 'javascript']
published: true
---

Okay, when I say installing ESLint "globally", I mean using one ESLint config for all VSCode project. You might be wondering why this is useful if you can just load the same config file in every single project, and you can. Setting up a global config file isn't to supercede the benefits of project-level dotfiles, but enhance the times you don't want to set up another project.

Say you want to practice some interview questions or edit a quick file, but still have your code style for readability. You _can_. Here I will walk you through setting up your own global ESLint dotfile.

## ESLint

In this brief tutorial we will be using VSCode + ESLint extension to point our editor to wherever we decide to drop our ESLint config file. First things first, let's install ESLint! We will be using <a href="https://yarnpkg.org" target="_blank">Yarn</a> to install our packages. Open your terminal and input the following:

`yarn global add eslint`

Once the command completes its execution you should now see a `package.json` and `node_modules/` folder in your global Yarn directory (tip: to find your directory you can run `yarn global dir`). Now that we have the essentials installed we can go ahead and create our ESLint dotfile:

`touch ~/.config/.eslintrc.js`

Open the newly created file and paste in the following:

```js
module.exports = {
  extends: 'eslint:recommended',
}
```

Great, we have ESLint installed globally and our dotfile has been created and populated with some content. We can now move forward to integrating with VSCode.

## VSCode Integration

First, install the <a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint" target="_blank">ESLint extension for VSCode</a>. This will give us access to settings available for ESLint in our editor.

If you created the ESLint dotfile elsewhere than the location noted above, don't worry, the location will not matter (seriously, you can put this thing anywhere if you wanted to, except the project directory - we'll get into that later). What will matter is the fact that VSCode will not be able to utilize environment variables to identify the location of your file, therefore you will need to use the full qualified path (example: `/Users/josef/.config/` rather than `~/.config`). Personally I drop mine in the `.config/` folder instead of the home root to avoid clogging up the directory with a plethora of dotfiles (this is virtually unavoidable). Given this information your VSCode User Settings for ESLint look this:

```json
{
  "editor.formatOnSave": false,
  "eslint.autoFixOnSave": true,
  "eslint.options": {
    "configFile": "/Users/josef/.config/.eslintrc.js"
  }
}
```

Okay. A couple things to note:

- `"editor.formatOnSave": false,` &mdash; we need this turned off otherwise VSCode and ESLint will clash when saving
- `"eslint.autoFixOnSave": true,` &mdash; this will turn on ESLint's auto-fixing instead of using VSCode's formatting.
- `"eslint.options": { "configFile": "/Users/josef/.config/.eslintrc.js" }` &mdash; here we pointed VSCode to our recently created dotfile
- `"eslint.packageManager": "yarn",` &mdash; this allows ESLint+VSCode to know _where_ the globally installed packages are location, and is imperative if you are using Yarn. If you replicated our installation steps using `npm` you don't need to worry as that is the default value for this setting.

## Test It Out

We should be all set. Go ahead and open a fresh VSCode instance (or reload your current window), pop open a JavaScript file and type away! You should notice little red squiggles underneath affected code. This is good! For reference as to what the ruleset we used (`eslint:recommended`) you can check out the list of rules <a href="https://eslint.org/docs/rules/" target="_blank">here</a>.

---

## A Quick Note

If you'd like to dive further into ESLint, I recommend checking out <a href="https://prettier.io" target="_blank">Prettier</a>. I don't use ESLint without Prettier because the formatting provided by Prettier out-of-the-box is _amazing_. Maybe try out some popular style guides like <a href="https://github.com/airbnb/javascript" target="_blank">AirBnB</a> or <a href="https://standardjs.com" target="_blank">Standard</a> (my personal favorite).

### Quick Links

- <a href="https://gist.github.com/josefaidt/c79bcff379683ac6109730523354fb82" target="_blank">
    My current ESLint dotfile
  </a>
- <a href="https://gist.github.com/josefaidt/ed9dcc84164243c5f03b9340161acd26" target="_blank">
    Fish shell ESLint utilities
  </a>
- <a href="https://fishshell.org" target="_blank">
    Fish
  </a>
