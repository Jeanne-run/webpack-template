import React from 'react';
import styles from './header.scss';

type String = {
  name:string
}

 const Header:React.FC<String> = ({name}) => {
    return (
      <div>
        <p className={styles.p}>{name}</p>
      </div>
    );
  }
  export default Header