import { Header } from "./components/Header";


//import { EmptyTask } from "./components/EmptyTask";
import { TaskList } from "./components/TaskList";

import styles from './App.module.css';

export function App() {

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <main>
          <TaskList />
        </main>
      </div>
    </>
  )
}


