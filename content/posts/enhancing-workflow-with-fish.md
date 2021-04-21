---
title: 'Enhancing Your Workflow With Fish Shell Functions'
description: 'Introduction to enhancing development workflows with the help of Fish functions'
date: 2019-02-27
tags: ['tooling', 'cli', 'development', 'workflow', 'fishshell']
published: true
---

The tooling surrounding the JavaScript community is uncanny. There are so many useful tools out in the wild such as Webpack, Rollup, create-react-app, **Gatsby**, VSCode extensions, and let's not forget npm & Yarn! Despite this I feel we often overlook our most important tool, the command line.

Though daunting at first, the command line has proven its reliability and operability time after time with utilities like Homebrew and Git. Even the lower-level, out-of-the-box utilities like `cat` and `grep` are incredibly useful. If you're not the type of person that prefers point-and-click operations to do something as monotonous copying a file or peeking into a file's contents then you may already know the value bash functions provide to drastically improve your existing workflow. But utilities don't have to be _intense_ to be useful in the smallest regards.

Typing commands such as `yarn workspace someWorkspace run someScript` can get tedious when you're in the middle of debugging an application. Or even specifying a configuration file in ESLint using `eslint --config ~/.config/.eslintrc.js someDirectory` if you're using a global config file. Some commands or words can be easily fumbled when typing (e.g. "components" and "workspace"). This is where functions come in to play.

## Fish Functions

Here we will be exploring functions in [fish shell](https://fishshell.com/), specifically how we can use its functions to shorten our everyday commands such as the two noted above. The syntax is different compared to traditional bash aliases, but I hope to get you up and running in no time by guiding you through a few examples.

Let's start with `yarn workspaces` by using an alias that is as fluid to type as it is short. Open your Fish configuration file via `code ~/.config/fish/config.fish` and input the following:

```shell
function ywrs
  command yarn workspaces $argv
end
```

That's it! You have just created your first function! Let's break this down:

- `function`: declaration keyword
- `ywrs`: our alias, this is what we will be able to type in our terminal
- `command yarn workspaces $argv`
  - `command`: keyword needed to tell the shell to "execute" the following command, just as how you would normally type into the terminal
  - `yarn workspaces`: the command we are wrapping
  - `$argv`: pass the remaining arguments to the defined command
    - `ywrs info` will thus execute `yarn workspaces info`

To test out your new function you will need to reload the fish configuration by reevaluating the `config.fish` file (this is also done when a new shell session is created): `source ~/.config/fish/config.fish`.

Now that you've got your feet wet, let's try a few more examples.

### Yarn Workspace

```shell
function ywr
  command yarn workspace $argv
end
```

Similar to the initial example, this will allow us to easily execute commands in a workspace via a keyword that is both short and easy to type.

### ESLint

```shell
function eslint
  command eslint --config ~/.eslintrc.js $argv
end
```

Here we are extending the existing, global `eslint` command by specifying a configuration file that can now be used throughout your projects without setting up a project-level ESLint dotfile. For additional learning regarding global ESLint and VSCode, check out my other [blog post](https://josefaidt.dev/blog/2019/01/global-eslint/).

### An _Intense_ Example

The ESLint example above allows you to use the `eslint` command with a single configuration file, but what about automating the project-level install? Below we will discover how we can leverage functions, internal functions, and a bit of bash logic to install all of our ESLint dependencies and copy our global configuration file to the working directory.

```shell
function yawn
    if test (count $argv) -lt 1; or test $argv[1] = "--help"
        printf "Don't yawn too loud now, I need a package name"
    else if test (count $argv) -eq 1
        switch $argv[1]
            case 'eslint'
                _install_eslint
            case '*'
                echo "Doesn't look like I have that package, try again."
        end
    else
        echo $argv
    end
end

function _install_eslint
    yarn add -D \
        eslint babel-eslint eslint-loader \
        prettier eslint-config-prettier eslint-plugin-prettier \
        eslint-config-standard eslint-plugin-standard \
        eslint-plugin-node \
        eslint-plugin-jsx-a11y \
        eslint-plugin-promise \
        eslint-plugin-import \
        eslint-plugin-react \
    ;and cp ~/.config/.eslintrc.js .
end
```

Though we won't dive _too_ deep into this example, let's briefly go over what value this example brings to the workflow:

- `function yawn...`: high-level alias that acts as a cli utility to route a subcommand (passed as an argument) and call its respective internal alias
- `function _install_eslint...`: internal alias that will be called from `yawn` given the input is `yawn eslint`.
  - installs ESLint dependencies
  - copies global ESLint config file
  - NOTE: often times commands used internally (not directly called by the user) will be prepended with an underscore, here we utilize this nomenclature to make our `config.fish` file more readable

With these new functions you are now able to dive into a new project and call `yawn eslint` to set up ESLint. Personally I use this all the time and love to automate monotonous tasks just like this example.

## Final Thoughts

So far we've covered:

- Fish functions
- Editing and using the Fish dotfile: `config.fish`
- Reloading the dotfile
- Using functions to shorten commands
- Using functions to extend commands
- Using functions to automate tasks

I hope I was able to convince you to start using this functionality, whether you use the examples provided or by creating your own. Speaking of, in the last example I provided the skeleton to add more subcommands to the `yawn` function, try setting up your own internal function that helps automate the tedious aspects of your workflow! I'd love to hear how Fish functions have enhanced your workflow, Tweet [@garlicbred](https://twitter.com/garlicbred) with your story!

### Resources

- [Fish syntax documentation](https://fishshell.com/docs/current/index.html#syntax)
- [Fish variables and functions documentation](https://fishshell.com/docs/current/index.html#identifiers)
