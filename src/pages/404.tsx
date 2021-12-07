import asyncComponent from '../@edcarlos/utility/asyncComponent';

export default asyncComponent(() =>
  import('../modules/errorPages/Error404/index'),
);
