module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // keeps Jasmine output visible in browser
    },
    reporters: ['progress', 'kjhtml'],
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,

    // Stability tweaks for Chrome disconnect issues
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 2,
    browserNoActivityTimeout: 60000,
    captureTimeout: 120000,
    pingTimeout: 10000,

    // Optional: Custom launcher to avoid GPU/sandbox issues
    customLaunchers: {
      ChromeCustom: {
        base: 'Chrome',
        flags: ['--no-sandbox', '--disable-gpu']
      }
    }
  });
};
