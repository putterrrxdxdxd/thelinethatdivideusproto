import { Canvas } from '@theline/core-renderer';
import styles from './page.module.css';

export default function Page() {
  return <div className={styles.canvas}><Canvas /></div>;
}
