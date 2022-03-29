import './App.css';
import { Fragment } from 'react';
import Header from './component/header';
import Form from './component/form';
import { Routes, Route } from "react-router-dom";
import Summary from './component/summary';
import NotFoundPage from './component/pageNotFound';

function App() {
  return (
    <main>
      <Routes>
      <Route path='*' element={<NotFoundPage />} />
        <Route path='/' element={<Fragment><Header /><Form /></Fragment>} />
        <Route path='/summary' element={<Summary />} />
        {/* <Route path="*" component={<NotFoundPage />} /> */}
      </Routes>
    </main>
  );
}

export default App;
