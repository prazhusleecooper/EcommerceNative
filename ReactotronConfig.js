import Reactotron, {asyncStorage} from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SyncStorage from 'sync-storage';


Reactotron
    .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
    .configure() // controls connection & communication settings
    .use(asyncStorage())
    .useReactNative() // add all built-in react native plugins
    .connect(); // let's connect!
