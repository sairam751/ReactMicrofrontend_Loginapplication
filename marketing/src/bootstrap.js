import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory,createBrowserHistory } from 'history';
import App from './App';

// Mount function to start up the app
const mount = (el,{ onNavigate,defaultHistory }) => {
    const history = defaultHistory || createMemoryHistory();
   // const browserHistory = createBrowserHistory();
    if(onNavigate)
    {
        history.listen(onNavigate);
    }
   // history.listen(onNavigate);


  ReactDOM.render(<App history={history} />, el);
  return{
    onParentNavigate({ pathname: nextPathName }){
       // console.log('conatiner navigated')
       //console.log(location);
       if(history.location.pathname!== nextPathName)
       {
        history.push(nextPathName);
       }
    }
  }
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing-dev-root');

  if (devRoot) {
    mount(devRoot,{ defaultHistory: createBrowserHistory()});
  }
}

// We are running through container
// and we should export the mount function
export { mount };
