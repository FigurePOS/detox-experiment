const AndroidDevicePathBuilder = require('../../artifacts/utils/AndroidDevicePathBuilder');
const DeviceRegistry = require('../../devices/DeviceRegistry');
const AAPT = require('../../devices/common/drivers/android/exec/AAPT');
const ADB = require('../../devices/common/drivers/android/exec/ADB');
const ApkValidator = require('../../devices/common/drivers/android/tools/ApkValidator');
const TempFileXfer = require('../../devices/common/drivers/android/tools/TempFileXfer');
const HashHelper = require('../../devices/common/drivers/android/tools/HashHelper');
const HashFileXfer = require('../../devices/common/drivers/android/tools/HashFileXfer');

class AndroidServiceLocator {
  static get emulator() {
    return require('./emulatorServiceLocator');
  }

  static get genycloud() {
    return require('./genycloudServiceLocator');
  }
}

AndroidServiceLocator.adb = new ADB();
AndroidServiceLocator.aapt = new AAPT();
AndroidServiceLocator.apkValidator = new ApkValidator(AndroidServiceLocator.aapt);
AndroidServiceLocator.fileXfer = new TempFileXfer(AndroidServiceLocator.adb);
AndroidServiceLocator.deviceRegistry = DeviceRegistry.forAndroid();
AndroidServiceLocator.devicePathBuilder = new AndroidDevicePathBuilder();
AndroidServiceLocator.hashXfer = new HashFileXfer(AndroidServiceLocator.adb);
AndroidServiceLocator.hashHelper = new HashHelper(AndroidServiceLocator.adb, AndroidServiceLocator.hashXfer);


module.exports = AndroidServiceLocator;