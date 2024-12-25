import React, { useState } from 'react';
import { Input, Textarea, Button, Field } from '@fluentui/react-components';
import { TaskFormData } from '../types/task';

interface TaskFormProps {
  onSubmit: (taskData: TaskFormData) => Promise<void>;
  initialData?: TaskFormData;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!formData.title.trim()) return;
      await onSubmit(formData);
      setFormData({ title: '', description: '' });
    } catch (error) {
      console.error('Submit failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Field label="Task Title">
        <Input
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          required
        />
      </Field>
      <Field label="Description (Optional)">
        <Textarea
          value={formData.description || ''}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </Field>
      <br />
      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-sky-500 text-white hover:bg-sky-700 disabled:opacity-50 transition-all"
        style={{
          backgroundColor: loading ? '#94a3b8' : undefined, // Grayish-blue for loading
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Submitting...' : initialData ? 'Update Task' : 'Create Task'}
      </Button>
    </div>
  );
};
