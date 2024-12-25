import React, { useState } from 'react';
import { Card, Button } from '@fluentui/react-components';
import { Task } from '../types/task';
import { taskService } from '../services/taskService';

interface TaskItemProps {
  task: Task;
  onUpdate: (updatedTask: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>(task);
  const [loading, setLoading] = useState(false);
  console.log(task.title)

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const updated = await taskService.updateTask(task.id, editedTask);
      onUpdate(updated);
      setIsEditing(false);
    } catch (error) {
      console.error('Update failed', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await taskService.deleteTask(task.id);
      onDelete(task.id);
    } catch (error) {
      console.error('Delete failed', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card >
      {isEditing ? (
        <>
          <input
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <textarea
            value={editedTask.description || ''}
            onChange={(e) =>
              setEditedTask((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
        </>
      ) : (
        <>
          <h2 className='text-lg'>{task.title}</h2>
          <p>{task.description}</p>
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
          <Button onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </>
      )}
    </Card>
  );
};
