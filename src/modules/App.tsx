import React from 'react';
import styles from './app.module.css';
import { LoginForm } from './components/LoginForm';

function App() {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
}

export default App;
