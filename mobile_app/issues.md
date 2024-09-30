1. snap-carousel giving many warnings

2. navigation prop types should be made in params/RootStackParamList not in individual screens

3. Use only react-native-screens instead of react-native:  import { useNavigation,NavigationProp   } from '@react-navigation/native';

4. Use use-navigation from react-native-screens instead of react-navigation/native: 
// import { useNavigation,NavigationProp   } from 'react-native-screens';
// import { useNavigation,NavigationProp   } from '@react-navigation/native';

5. Use NativeStackScreenProps instead of NavigationProps:  
//type GetphoneScreenNavigationProp = //NavigationProp//<RootStackParamList, 'Getphone'>;

//type CreateProfileFormProps = //NativeStackScreenProps//<RootStackParamList, 'CreateProfile'>;

#inbuilt navigation and route:

export type NativeStackScreenProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string,
  NavigatorID extends string | undefined = undefined
> = {
  navigation: NativeStackNavigationProp<ParamList, RouteName, NavigatorID>;
  route: RouteProp<ParamList, RouteName>;
};

6. GetPhone condition phone number empty not in react
7. 