// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  "ng2-radio-group": "vendor/ng2-radio-group"
};

/** User packages configuration. */
const packages: any = {
  "ng2-radio-group": { "main": "index.js", "defaultExtension": "js" }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/intro-screen',
  'app/prizes-screen',
  'app/rules-screen',
  'app/questions-screen',
  'app/menu-screen',
  'app/results-screen',
  'app/question',
  'app/signin-screen',
  'app/gameover-screen',
  'app/admin-screen',
  'app/question-detail',
  'app/admin-screen/question-detail',
  'app/admin-screen/question/question-detail',
  'app/admin-screen/question/question-row',
  'app/questions-screen/answer',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
