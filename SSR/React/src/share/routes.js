import VDom from "./vdom";
import List from "./list";

const routes = [
  {
    path: '/',
    component: VDom,
    exact: true
  },
  {
    path: '/list',
    ...List
  }
]

export default routes