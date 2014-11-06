1. `mkdir /path/to/projectname`
1. from inside of one terminal window:
1. `git clone git@github.com:greenfieldhq/greenfield_rails.git`
1. `cd greenfield_rails`
1. `./bin/greenfield_rails /path/to/projectname/rails_app`
1. Move the generated `rails_app` directory into `/path/to/projectname/rails`
1. `cd /path/to/projectname/rails`
1. `mkdir -p .git/safe`
1. `rails s`
1. from inside another terminal window
1. `git clone git@github.com:greenfieldhq/greenfield-base.git`
1. `cp -R ember /path/projectname/ember`
1. Update the app name

  These files reference the base app name, "Greenfield", and should be updated (use-dashes-if-needed).

  * app/index.html
  * app/templates/application.hbs
  * README.md
  * tests/index.html

  These files reference the base app name, "greenfield", and should be updated.

  * app/index.html
  * bower.json
  * config/environment.js
  * package.json
  * tests/index.html

1. `npm install`
1. `bower install`
1. `ember serve` # NOTE: default proxy is set in the .ember-cli file
1. in a broswer, navigate to `http://localhost:4200`
1. check `rails/db/seeds.rb` for sample users to login with
1. Finally, `git init` from the root /path/to/projectname
