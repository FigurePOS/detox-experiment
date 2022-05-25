const cp = require('child_process');
const os = require('os');

const _ = require('lodash');
const unparse = require('yargs-unparser');

const context = require('../../realms/root');
const { printEnvironmentVariables, prependNodeModulesBinToPATH } = require('../../src/utils/envUtils');
const { quote } = require('../../src/utils/shellQuote');

class TestRunnerCommand {
  constructor() {
    this._argv = {};
    this._env = {};
    this._envHint = {};
    this._retries = 0;
    this._deviceConfig = null;
  }

  setDeviceConfig(config) {
    this._deviceConfig = config;

    return this;
  }

  setRunnerConfig({ args, retries, inspectBrk }) {
    this._argv = args;
    this._retries = retries;

    if (inspectBrk) {
      this._enableDebugMode();
    }

    return this;
  }

  _enableDebugMode() {
    /* istanbul ignore if */
    if (os.platform() === 'win32') {
      this._argv.$0 = `node --inspect-brk ./node_modules/jest/bin/jest.js`;
    } else {
      this._argv.$0 = `node --inspect-brk ./node_modules/.bin/jest`;
    }

    this._env = this._envHint;
    this._argv.runInBand = true;
  }

  replicateCLIConfig(cliConfig) {
    this._envHint = _.omitBy({
      DETOX_APP_LAUNCH_ARGS: cliConfig.appLaunchArgs,
      DETOX_ARTIFACTS_LOCATION: cliConfig.artifactsLocation,
      DETOX_CAPTURE_VIEW_HIERARCHY: cliConfig.captureViewHierarchy,
      DETOX_CLEANUP: cliConfig.cleanup,
      DETOX_CONFIGURATION: cliConfig.configuration,
      DETOX_CONFIG_PATH: cliConfig.configPath,
      DETOX_DEBUG_SYNCHRONIZATION: cliConfig.debugSynchronization,
      DETOX_DEVICE_BOOT_ARGS: cliConfig.deviceBootArgs,
      DETOX_DEVICE_NAME: cliConfig.deviceName,
      DETOX_FORCE_ADB_INSTALL: this._deviceConfig.type.startsWith('android.')
        ? cliConfig.forceAdbInstall
        : undefined,
      DETOX_GPU: cliConfig.gpu,
      DETOX_HEADLESS: cliConfig.headless,
      DETOX_KEEP_LOCKFILE: cliConfig.keepLockFile,
      DETOX_LOGLEVEL: cliConfig.loglevel,
      DETOX_READ_ONLY_EMU: cliConfig.readonlyEmu,
      DETOX_RECORD_LOGS: cliConfig.recordLogs,
      DETOX_RECORD_PERFORMANCE: cliConfig.recordPerformance,
      DETOX_RECORD_TIMELINE: cliConfig.recordTimeline,
      DETOX_RECORD_VIDEOS: cliConfig.recordVideos,
      DETOX_REPORT_SPECS: cliConfig.jestReportSpecs,
      DETOX_REUSE: cliConfig.reuse,
      DETOX_TAKE_SCREENSHOTS: cliConfig.takeScreenshots,
      DETOX_USE_CUSTOM_LOGGER: cliConfig.useCustomLogger,
    }, _.isUndefined);

    return this;
  }

  async execute() {
    let runsLeft = 1 + this._retries;
    let launchError;

    do {
      try {
        if (launchError) {
          const list = this._argv._.map((file, index) => `  ${index + 1}. ${file}`).join('\n');
          context.log.error(
            `There were failing tests in the following files:\n${list}\n\n` +
            'Detox CLI is going to restart the test runner with those files...\n'
          );
        }

        await this._doExecute();
        launchError = null;
      } catch (e) {
        launchError = e;

        const { lastFailedTests } = context;
        if (_.isEmpty(lastFailedTests)) {
          throw e;
        }

        this._argv._ = lastFailedTests;
        this._env.DETOX_RERUN_INDEX = 1 + (this._env.DETOX_RERUN_INDEX || 0);
      }
    } while (launchError && --runsLeft > 0);

    if (launchError) {
      throw launchError;
    }
  }

  async _doExecute() {
    const { $0: command, _: specs, '--': passthrough, ...restArgv } = this._argv;
    const fullCommand = [
      command,
      quote(unparse(_.omitBy(restArgv, _.isUndefined))),
      passthrough ? passthrough.join(' ') : undefined,
      specs ? specs.join(' ') : undefined,
    ].filter(Boolean).join(' ');

    context.log.info(
      { env: this._envHint },
      printEnvironmentVariables(this._envHint) + fullCommand
    );

    cp.execSync(fullCommand, {
      stdio: 'inherit',
      env: _({})
        .assign(process.env)
        .assign(this._env)
        .omitBy(_.isUndefined)
        .tap(prependNodeModulesBinToPATH)
        .value()
    });
  }
}

module.exports = TestRunnerCommand;