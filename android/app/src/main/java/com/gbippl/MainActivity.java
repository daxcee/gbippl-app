package com.gbippl;

import com.facebook.react.ReactActivity;
import com.BV.LinearGradient.LinearGradientPackage;
import com.AirMaps.AirPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.xebia.reactnative.TabLayoutPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.ivanph.webintent.RNWebIntentPackage;
import com.burnweb.rnsendintent.RNSendIntentPackage;
import com.geektime.reactnativeonesignal.ReactNativeOneSignalPackage;

import java.util.Arrays;
import java.util.List;
import me.neo.react.StatusBarPackage;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "gbippl";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

   /**
   * A list of packages used by the app. If the app uses additional views
   * or modules besides the default ones, add more packages here.
   */
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new LinearGradientPackage(),
        new AirPackage(),
        new VectorIconsPackage(),
        new TabLayoutPackage(),
        new StatusBarPackage(this),
        new RNWebIntentPackage(),
        new RNSendIntentPackage(),
        new ReactNativeOneSignalPackage(this)
      );
    }
}
