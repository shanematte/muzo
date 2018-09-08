import { Appodeal } from 'react-native-appodeal'

Appodeal.setTabletBanners(true)
Appodeal.setSmartBanners(true)
Appodeal.setBannerAnimation(true)
Appodeal.setBannerBackground(true)

Appodeal.disableLocationPermissionCheck()

Appodeal.initialize("a9e4912676723f4fcf95077c1344f47f6983af1f480729c3", Appodeal.BANNER)

export default Appodeal