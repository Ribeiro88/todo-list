import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { PlusCircle, Trash } from 'phosphor-react';

import { EmptyTask } from './EmptyTask';
import { Filter } from './Filter';

import styles from './TaskList.module.css';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList(){

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskInfo, setNewTaskInfo] = useState('');
  

  useEffect(() => { 
    const allTasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(allTasksFromLocalStorage);
  }, []);

  
  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    const newTask = { id: Math.random() * 100, title: newTaskInfo,  isComplete: false };

    if (newTask) {
      setTasks([...tasks, newTask]);
      localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
      setNewTaskInfo('');
    }
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTaskInfo(event.target.value);
  }

  function handleCheckTask(id: number){
    const changedTaks = tasks.map((task) => 
      task.id === id ? {
        ...task,
        isComplete: !task.isComplete,
      }
      : task
    )

    setTasks(changedTaks);
    localStorage.setItem('tasks', JSON.stringify(changedTaks));
  }

  function handleDeleteTask(id: number){
  
    const deletedTasks = tasks.filter(task => task.id !== id);
    setTasks(deletedTasks);
    localStorage.setItem('tasks', JSON.stringify(deletedTasks));
  }


  const totalTasksCreated = tasks.length;
  

  const completedTasks = tasks.reduce((previousValue, currentValue) => previousValue + Number(currentValue.isComplete), 0,);


  return (
    <section className={styles.taskList}>
      <form className={styles.newTask} onSubmit={handleCreateNewTask}>
        <input type="text" placeholder="Adicionar uma nova tarefa" value={newTaskInfo} onChange={handleNewTaskChange} />
        <button type="submit">Criar <PlusCircle size={20} /></button>
      </form>

      <div className={styles.filterContent}>
        <Filter type="criadas" created={totalTasksCreated}  />
        <Filter type="concluidas" created={totalTasksCreated} completed={completedTasks}  />
      </div>

      {tasks.length <= 0 ? 
        <EmptyTask /> : (
          tasks.map(task => {
            return (
              <div className={styles.taskContent} key={task.id}>
                <input type="checkbox" readOnly checked={task.isComplete} className={styles.checkbox} onClick={() => handleCheckTask(task.id)}/>
                <p className={task.isComplete ? styles.complete : ''}>{task.title}</p>
                <button onClick={() => handleDeleteTask(task.id)}><Trash size={24} /></button>
              </div>
            )
          })
        )
      }
    </section>
  );
}