//inport modules and style
 import "./styles/style.scss";
 import * as App from './js/appControler';

// init App
App.init();

// HMR 
if (module.hot) {
  module.hot.accept();
}
