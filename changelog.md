# Changelog

## 1.6 (10 February 2018)

* Updated most packages to newer versions.
* Fixed an issue in `weighted-interest.js` related to a `lodash` change `_.times`. In v 3.10.1, `_.times` supported an optional third argument `thisArg` which it no longer does in v 4.17.5.
* Better split `dependencies` and `dev-dependencies` in `package.json`.
* Added `npm run clean` command for nuking `./node_modules` folder and reinstalling all packages.

## 1.5 (7 June 2015)

* Made a `gh-pages` branch to display this to the world. Added a link to it in `readme.md`
* Removed a few @todo directives which have already been logged in the Issues section of this repo.
* Fixed Issue #8 which pertained to compounding interest calculations

## 1.4 (6 June 2015)

* Restructured `/scripts` folder, organized by module rather than code. For instance, `views/` was split into `weighted-interest/views` and `amortization/views`.
* Removed a lingering `console.log()`.
* Fixed a rendering bug that prevented event handlers from firing due to cached views.
* Added release dates to this changelog.

## 1.3 (6 June 2015)

Major new features and code restructure

* The app is now running on a Backbone Router allowing for multiple views to be rendered in the same page.
* Added a whole new calculator, the **Weighted Interest Calculator** at `#weighted-interest` which helps you figure out your interest rate.
* Also added this changelog.

## 1.2 (30 May 2015)

Fixed a bug that caused additional calculations after the first to append the new set of rows to the bottom of the table rather than reset the table first.

## 1.1 (4 May 2015)

* Optimized payment row rendering performance
* Changed how and when views are rendered.

## 1.0 (30 April 2015)

Inadvertently silent release (I forgot to update `package.json` so nowhere in the version history does it ever read `1.0`)

* Interest is calculated to make it more accurate.

## 0.9 (30 April 2015)

First public release
