package clirn.tandir;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import android.content.res.Configuration;

// RNGH
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "tandir";
  }

  // For react-native-screens
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }

  // For Appearance API
  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    getReactInstanceManager().onConfigurationChanged(this, newConfig);
  }


}
