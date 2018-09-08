package com.muzo;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.brentvatne.react.ReactVideoPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.reactlibrary.RNAppodealPackage;
import com.adjust.nativemodule.AdjustPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactVideoPackage(),
            new RNSpinkitPackage(),
            new ReactNativePushNotificationPackage(),
            new OrientationPackage(),
            new ReactNativeOneSignalPackage(),
            new FBSDKPackage(mCallbackManager),
            new RNAppodealPackage(),
            new AdjustPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
