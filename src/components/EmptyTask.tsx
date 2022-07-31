import { ClipboardText } from 'phosphor-react';
import styles from './EmptyTask.module.css';

export function EmptyTask(){
  return (
    <div className={styles.emptyTask}>
      <ClipboardText size={56} />
      <strong>Você ainda não tem tarefas cadastradas</strong>
      <span>Crie tarefas e organize seus itens a fazer</span>
    </div>
  );
}