import { z, defineCollection } from "astro:content";

const posts = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      readTime: z.string(),
      author: z.string(),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }),
      tags: z.array(z.string())
    })
});

const countries = defineCollection({
    type: 'data',
    schema: z.object({
      name: z.string(),
      treaties: z.array(z.string()),   
      excempted: z.string(),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }),
    })
});

const resources = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      lastEditDate: z.date(),
      description: z.string(),
      author: z.string(),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }),
      tags: z.array(z.string())
    })
});


const visas = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    type: z.string(),
    beneficiaries: z.array(z.string()),
    workPermit: z.array(z.string()),
    sponsored: z.array(z.string()),
    article: z.number().optional(),
    popular: z.boolean().optional(),
    short_description: z.string().optional(),
    requirements: z.array(z.string()).optional(),
    countries: z.array(z.string()),
    visa_rara: z.z.boolean().optional()
  })
});

const authors = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    name: z.string(),
    email: z.string(),
    photo: z.string(),
  })
});

export const collections = {
  'posts': posts,
  'resources': resources,  
  'visas': visas,
  'countries': countries,
  'authors': authors,
};

