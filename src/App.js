import React, { Component } from 'react';
import Routes from '../src/components/Routes';
import TopNavigation from './components/topNavigation';
import Footer from './components/Footer';
import './index.css';
import 'react-datetime/css/react-datetime.css';

class App extends Component {
  render() {
    return (
      <div className='flexible-content'>
        <TopNavigation />
        <main id='' className='p-5'>
          <Routes />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
