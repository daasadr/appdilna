'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { directus } from '@/lib/directus';
import { readItems, createItems, updateItems } from '@directus/sdk';
import { Schema } from '@/lib/directus';

interface ContentEditorProps {
  appId: string;
  contentTypeId: string;
  contentId?: string;
}

export function ContentEditor({ appId, contentTypeId, contentId }: ContentEditorProps) {
  const queryClient = useQueryClient();

  // Načtení typu obsahu
  const { data: contentType } = useQuery({
    queryKey: ['contentType', contentTypeId],
    queryFn: async () => {
      const result = await directus.request(readItems('content_types', {
        filter: { id: { _eq: contentTypeId } }
      }));
      return result[0];
    }
  });

  // Načtení existujícího obsahu pro editaci
  const { data: existingContent } = useQuery({
    queryKey: ['content', contentId],
    queryFn: async () => {
      if (!contentId) return null;
      const result = await directus.request(readItems('content', {
        filter: { id: { _eq: contentId } }
      }));
      return result[0];
    },
    enabled: !!contentId
  });

  // Vytvoření Zod schématu podle polí
  const createSchema = (fields: Schema['content_types']['fields']) => {
    const schemaFields = fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: field.required 
        ? z.string().min(1, 'Toto pole je povinné')
        : z.string().optional()
    }), {});
    
    return z.object(schemaFields);
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(contentType ? createSchema(contentType.fields) : z.object({})),
    defaultValues: existingContent?.data
  });

  const mutation = useMutation({
    mutationFn: async (data: Record<string, any>) => {
      if (contentId) {
        return directus.request(updateItems('content', [{
          id: contentId,
          data
        }]));
      } else {
        return directus.request(createItems('content', [{
          app_id: appId,
          type_id: contentTypeId,
          data,
          status: 'draft'
        }]));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content'] });
    }
  });

  if (!contentType) return <div>Načítám...</div>;

  return (
    <form onSubmit={handleSubmit(data => mutation.mutate(data))} className="space-y-6">
      {contentType.fields.map(field => (
        <div key={field.name} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {field.name}
            {field.required && <span className="text-red-500">*</span>}
          </label>
          
          {field.type === 'rich_text' ? (
            <textarea
              {...register(field.name)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={5}
            />
          ) : field.type === 'image' ? (
            <input
              type="file"
              accept="image/*"
              {...register(field.name)}
              className="mt-1 block w-full"
            />
          ) : (
            <input
              type={field.type === 'number' ? 'number' : 'text'}
              {...register(field.name)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          )}
          
          {errors[field.name] && (
            <p className="mt-1 text-sm text-red-600">
              {errors[field.name]?.message as string}
            </p>
          )}
        </div>
      ))}
      
      <div className="flex justify-end gap-3">
        <button 
          type="button"
          className="px-4 py-2 border rounded-md hover:bg-gray-50"
          onClick={() => window.history.back()}
        >
          Zrušit
        </button>
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Ukládám...' : contentId ? 'Uložit změny' : 'Vytvořit'}
        </button>
      </div>
    </form>
  );
} 