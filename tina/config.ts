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
          // Featured/Stacked flags (Single Source of Truth)
          {
            type: 'boolean',
            name: 'is_featured',
            label: 'Featured in New Releases',
            description: 'Show this book in the New Releases section on homepage',
          },
          {
            type: 'number',
            name: 'featured_order',
            label: 'Featured Order',
            description: 'Display order in New Releases (lower = first)',
          },
          {
            type: 'boolean',
            name: 'is_stacked',
            label: 'Featured in Stacked Section',
            description: 'Show this book in the Stacked promo section',
          },
          {
            type: 'number',
            name: 'stacked_priority',
            label: 'Stacked Priority',
            description: 'Display priority in Stacked section (lower = higher priority)',
          },
        ],
      },
      {
        name: 'banners',
        label: 'Banners',
        path: 'src/assets/json',
        format: 'json',
        filename: 'banner',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            required: true,
          },
          {
            type: 'string',
            name: 'subtitle',
            label: 'Subtitle',
            required: true,
          },
          {
            type: 'string',
            name: 'date',
            label: 'Campaign Date',
          },
          {
            type: 'string',
            name: 'image',
            label: 'Banner Image (filename in /banners/)',
            required: true,
          },
          {
            type: 'string',
            name: 'label',
            label: 'Label (e.g., Best Seller)',
          },
        ],
      },
    ],
  },
})