import styles from './Filter.module.css';

// interface Task {
//   id: number;
//   title: string;
//   isComplete: boolean;
// }

interface FilterProps {
  type: 'criadas' | 'concluidas';
  created?: number;
  completed?: number;
}


export function Filter({ type, created, completed }: FilterProps){

  return (
    <div className={styles.filter}>
      <button type="button" className={type === 'criadas' ? styles.criadas : styles.concluidas}>
        {type === 'criadas' ? 'Tarefas criadas' : 'Concluídas'}
      </button>
      {type === 'criadas' ? <span>{created}</span> : completed === 0 ? <span>0</span> : <span>{completed} de {created}</span>} 
    </div>
  );
}