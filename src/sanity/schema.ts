import { type SchemaTypeDefinition } from 'sanity'

const category: SchemaTypeDefinition = {
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'order',
            title: 'Order',
            type: 'number',
            description: 'Order in which this category appears',
            validation: (Rule) => Rule.required(),
        }
    ],
}

const project: SchemaTypeDefinition = {
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'overview',
            title: 'Overview',
            type: 'text',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'image',
            title: 'Project Cover Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'videoUrl',
            title: 'Video Preview URL (Optional)',
            type: 'url',
        },
        {
            name: 'link',
            title: 'Project Link',
            type: 'url',
        },
        {
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
            validation: (Rule) => Rule.required(),
        }
    ],
}

export const schemaTypes = [category, project]
