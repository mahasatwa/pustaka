import { defineConfig } from 'tinacms'

export default defineConfig({
  branch: 'main',
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },

  media: {
    tina: {
      mediaRoot: 'assets/img',
      publicFolder: 'public',
      static: true,
    },
  },

  schema: {
    collections: [
      {
        name: 'books',
        label: 'Books',
        path: 'src/assets/json/books',
        format: 'json',
        uidFieldName: 'pretty_url',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            required: true,
          },
          {
            type: 'string',
            name: 'author',
            label: 'Author',
            required: true,
          },
          {
            type: 'string',
            name: 'pretty_url',
            label: 'URL Slug',
            required: true,
          },
          {
            type: 'string',
            name: 'price_new',
            label: 'New Price',
            required: true,
          },
          {
            type: 'string',
            name: 'price_old',
            label: 'Old Price',
          },
          {
            type: 'string',
            name: 'image',
            label: 'Cover Image Filename',
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            required: true,
          },
          {
            type: 'string',
            name: 'publisher',
            label: 'Publisher',
          },
          {
            type: 'string',
            name: 'isbn',
            label: 'ISBN',
          },
          {
            type: 'string',
            name: 'language',
            label: 'Language',
          },
          {
            type: 'string',
            name: 'publication_date',
            label: 'Publication Date',
          },
          {
            type: 'number',
            name: 'pages',
            label: 'Pages',
          },
          {
            type: 'string',
            name: 'dimensions',
            label: 'Dimensions',
          },
          {
            type: 'string',
            name: 'weight',
            label: 'Weight',
          },
          {
            type: 'string',
            name: 'cover',
            label: 'Cover Type',
          },
          {
            type: 'string',
            name: 'discount',
            label: 'Discount',
          },
        ],
      },
    ],
  },
})