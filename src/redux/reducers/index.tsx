import Settings from './Setting';
import Common, { UsersReducer } from './Common';
import General from './General';
import Barber from './Barber';

const reducers = {
  settings: Settings,
  common: Common,
  usereducer: UsersReducer,
  general: General,
  barber: Barber,
};

export default reducers;
