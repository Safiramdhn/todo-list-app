import React, { useState, useEffect } from 'react';
import { TaskItem } from '../components/TaskItem';
import { TaskForm } from '../components/TaskForm';
import { Task, TaskFormData } from '../types/task';
import { taskService } from '../services/taskService';

export const TaskManagementPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchTasks = async (currentPage: number) => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const fetchedTasks = await taskService.getTasks({ page: currentPage, limit: 10 });

      if (fetchedTasks.length < 10) {
        setHasMore(false); // No more tasks to fetch
      }

      setTasks((prev) => [...prev, ...fetchedTasks.filter((newTask) => !prev.some((task) => task.id === newTask.id))]);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: TaskFormData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks((prev) => [...prev, newTask]);
    } catch (error) {
      console.error('Task creation failed', error);
    }
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prev) => prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleScroll = () => {
    const scrollThreshold = 150;
    const bottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - scrollThreshold;

    if (bottom && hasMore && !loading) {
      console.log('Scrolling: loading more tasks...');
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchTasks(page);
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Only run once on mount

  // Initial fetch on mount
  useEffect(() => {
    fetchTasks(page);
  }, []); // Fetch tasks when the component mounts

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>
      <TaskForm onSubmit={handleCreateTask} />

      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />
      ))}

      {loading && <p>Loading tasks...</p>}
      {!hasMore && <p>No more tasks to load.</p>}
    </div>
  );
};
