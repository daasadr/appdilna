'use client';

import { directus } from '@/lib/directus';
import { createItems } from '@directus/sdk';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const createAppSchema = z.object({
  name: z.string().min(1, 'Název aplikace je povinný'),
  template_id: z.string().min(1, 'Vyberte šablonu'),
});

type CreateAppFormData = z.infer<typeof createAppSchema>;

export function CreateAppForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<CreateAppFormData>({
    resolver: zodResolver(createAppSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: CreateAppFormData) => {
      const slug = data.name.toLowerCase().replace(/\s+/g, '-');
      return directus.request(createItems('apps', [{
        name: data.name,
        slug,
        template_id: data.template_id,
        status: 'draft',
        settings: {}
      }]));
    },
    onSuccess: (data) => {
      const appId = data[0].id;
      router.push(`/cms/${appId}`);
    },
  });

  return (
    <form onSubmit={handleSubmit(data => mutation.mutate(data))} className="space-y-6 max-w-md mx-auto p-6">
      <div>
        <h1 className="text-2xl font-bold mb-6">Vytvořit novou aplikaci</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Název aplikace
            </label>
            <input
              type="text"
              {...register('name')}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Moje nová aplikace"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Šablona
            </label>
            <select
              {...register('template_id')}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Vyberte šablonu</option>
              <option value="blog">Blog</option>
              <option value="eshop">E-shop</option>
              <option value="portfolio">Portfolio</option>
            </select>
            {errors.template_id && (
              <p className="mt-1 text-sm text-red-600">{errors.template_id.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={mutation.isPending}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {mutation.isPending ? 'Vytvářím...' : 'Vytvořit aplikaci'}
        </button>
      </div>
    </form>
  );
}
