import React from 'react';
import { useSpring, animated } from 'react-spring';
import Header from '@src/components/Header/Header';

import asuka from '../../assets/images/asuka.jpg'
import photo1 from '../../assets/images/1.jpg';
import photo2 from '../../assets/images/2.jpg';
import photo3 from '../../assets/images/3.jpg';
import photo4 from '../../assets/images/4.png';
import photo5 from '../../assets/images/5.jpg';
import photo6 from '../../assets/images/6.png';
import photo7 from '../../assets/images/7.jpg';
import photo8 from '../../assets/images/8.jpg';
import styles from './home.css';

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1];
const trans: any = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
export const photoImages = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8];
export default function Home() {

  const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 1, tension: 170, friction: 26 } }))
 

  return (
    
    <div className={styles.index}>
     
      {/* <Header name='webpack' />
      <h1 className={styles.css}>使用Webpack等搭建一个适用于React项目的脚手架</h1>
      <img src={asuka} style={styles.img} alt=""/> */}
      <animated.div
        className={styles.card}
        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{ transform: props.xys.interpolate(trans) }}
      />
   
    </div>
  );
}