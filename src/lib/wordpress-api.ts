import axios from 'axios';
import { 
  WordPressPost, 
  WordPressPage, 
  WordPressCategory, 
  WordPressTag, 
  WordPressMedia, 
  WordPressAuthor 
} from '@/types/wordpress';

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://thevibecode.io/wp-json/wp/v2';

const api = axios.create({
  baseURL: WORDPRESS_API_URL,
  timeout: 10000,
});

export class WordPressAPI {
  // Posts
  static async getPosts(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    categories?: number[];
    tags?: number[];
    author?: number;
    status?: string;
    orderby?: string;
    order?: 'asc' | 'desc';
    _embed?: boolean;
  }): Promise<{ posts: WordPressPost[]; totalPages: number; total: number }> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
      if (params?.search) queryParams.append('search', params.search);
      if (params?.categories) queryParams.append('categories', params.categories.join(','));
      if (params?.tags) queryParams.append('tags', params.tags.join(','));
      if (params?.author) queryParams.append('author', params.author.toString());
      if (params?.status) queryParams.append('status', params.status);
      if (params?.orderby) queryParams.append('orderby', params.orderby);
      if (params?.order) queryParams.append('order', params.order);
      if (params?._embed) queryParams.append('_embed', 'true');

      const response = await api.get(`/posts?${queryParams.toString()}`);
      
      return {
        posts: response.data,
        totalPages: parseInt(response.headers['x-wp-totalpages'] || '1'),
        total: parseInt(response.headers['x-wp-total'] || '0'),
      };
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw new Error('Failed to fetch posts');
    }
  }

  static async getPostBySlug(slug: string): Promise<WordPressPost | null> {
    try {
      const response = await api.get(`/posts?slug=${slug}&_embed=true`);
      return response.data[0] || null;
    } catch (error) {
      console.error('Error fetching post by slug:', error);
      return null;
    }
  }

  static async getPostById(id: number): Promise<WordPressPost | null> {
    try {
      const response = await api.get(`/posts/${id}?_embed=true`);
      return response.data;
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      return null;
    }
  }

  // Pages
  static async getPages(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    parent?: number;
    status?: string;
    orderby?: string;
    order?: 'asc' | 'desc';
    _embed?: boolean;
  }): Promise<{ pages: WordPressPage[]; totalPages: number; total: number }> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
      if (params?.search) queryParams.append('search', params.search);
      if (params?.parent) queryParams.append('parent', params.parent.toString());
      if (params?.status) queryParams.append('status', params.status);
      if (params?.orderby) queryParams.append('orderby', params.orderby);
      if (params?.order) queryParams.append('order', params.order);
      if (params?._embed) queryParams.append('_embed', 'true');

      const response = await api.get(`/pages?${queryParams.toString()}`);
      
      return {
        pages: response.data,
        totalPages: parseInt(response.headers['x-wp-totalpages'] || '1'),
        total: parseInt(response.headers['x-wp-total'] || '0'),
      };
    } catch (error) {
      console.error('Error fetching pages:', error);
      throw new Error('Failed to fetch pages');
    }
  }

  static async getPageBySlug(slug: string): Promise<WordPressPage | null> {
    try {
      const response = await api.get(`/pages?slug=${slug}&_embed=true`);
      return response.data[0] || null;
    } catch (error) {
      console.error('Error fetching page by slug:', error);
      return null;
    }
  }

  // Categories
  static async getCategories(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    exclude?: number[];
    include?: number[];
    order?: 'asc' | 'desc';
    orderby?: string;
    hide_empty?: boolean;
    parent?: number;
  }): Promise<{ categories: WordPressCategory[]; totalPages: number; total: number }> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
      if (params?.search) queryParams.append('search', params.search);
      if (params?.exclude) queryParams.append('exclude', params.exclude.join(','));
      if (params?.include) queryParams.append('include', params.include.join(','));
      if (params?.order) queryParams.append('order', params.order);
      if (params?.orderby) queryParams.append('orderby', params.orderby);
      if (params?.hide_empty !== undefined) queryParams.append('hide_empty', params.hide_empty.toString());
      if (params?.parent) queryParams.append('parent', params.parent.toString());

      const response = await api.get(`/categories?${queryParams.toString()}`);
      
      return {
        categories: response.data,
        totalPages: parseInt(response.headers['x-wp-totalpages'] || '1'),
        total: parseInt(response.headers['x-wp-total'] || '0'),
      };
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories');
    }
  }

  // Tags
  static async getTags(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    exclude?: number[];
    include?: number[];
    order?: 'asc' | 'desc';
    orderby?: string;
    hide_empty?: boolean;
  }): Promise<{ tags: WordPressTag[]; totalPages: number; total: number }> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
      if (params?.search) queryParams.append('search', params.search);
      if (params?.exclude) queryParams.append('exclude', params.exclude.join(','));
      if (params?.include) queryParams.append('include', params.include.join(','));
      if (params?.order) queryParams.append('order', params.order);
      if (params?.orderby) queryParams.append('orderby', params.orderby);
      if (params?.hide_empty !== undefined) queryParams.append('hide_empty', params.hide_empty.toString());

      const response = await api.get(`/tags?${queryParams.toString()}`);
      
      return {
        tags: response.data,
        totalPages: parseInt(response.headers['x-wp-totalpages'] || '1'),
        total: parseInt(response.headers['x-wp-total'] || '0'),
      };
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw new Error('Failed to fetch tags');
    }
  }

  // Media
  static async getMedia(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    author?: number;
    parent?: number;
    media_type?: string;
    mime_type?: string;
    order?: 'asc' | 'desc';
    orderby?: string;
  }): Promise<{ media: WordPressMedia[]; totalPages: number; total: number }> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
      if (params?.search) queryParams.append('search', params.search);
      if (params?.author) queryParams.append('author', params.author.toString());
      if (params?.parent) queryParams.append('parent', params.parent.toString());
      if (params?.media_type) queryParams.append('media_type', params.media_type);
      if (params?.mime_type) queryParams.append('mime_type', params.mime_type);
      if (params?.order) queryParams.append('order', params.order);
      if (params?.orderby) queryParams.append('orderby', params.orderby);

      const response = await api.get(`/media?${queryParams.toString()}`);
      
      return {
        media: response.data,
        totalPages: parseInt(response.headers['x-wp-totalpages'] || '1'),
        total: parseInt(response.headers['x-wp-total'] || '0'),
      };
    } catch (error) {
      console.error('Error fetching media:', error);
      throw new Error('Failed to fetch media');
    }
  }

  static async getMediaById(id: number): Promise<WordPressMedia | null> {
    try {
      const response = await api.get(`/media/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching media by ID:', error);
      return null;
    }
  }

  // Authors
  static async getAuthors(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    exclude?: number[];
    include?: number[];
    order?: 'asc' | 'desc';
    orderby?: string;
    roles?: string[];
  }): Promise<{ authors: WordPressAuthor[]; totalPages: number; total: number }> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
      if (params?.search) queryParams.append('search', params.search);
      if (params?.exclude) queryParams.append('exclude', params.exclude.join(','));
      if (params?.include) queryParams.append('include', params.include.join(','));
      if (params?.order) queryParams.append('order', params.order);
      if (params?.orderby) queryParams.append('orderby', params.orderby);
      if (params?.roles) queryParams.append('roles', params.roles.join(','));

      const response = await api.get(`/users?${queryParams.toString()}`);
      
      return {
        authors: response.data,
        totalPages: parseInt(response.headers['x-wp-totalpages'] || '1'),
        total: parseInt(response.headers['x-wp-total'] || '0'),
      };
    } catch (error) {
      console.error('Error fetching authors:', error);
      throw new Error('Failed to fetch authors');
    }
  }

  static async getAuthorById(id: number): Promise<WordPressAuthor | null> {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching author by ID:', error);
      return null;
    }
  }

  // Search
  static async search(query: string, params?: {
    type?: string[];
    subtype?: string[];
    page?: number;
    per_page?: number;
  }): Promise<{
    results: Array<{
      id: number;
      title: string;
      url: string;
      type: string;
      subtype: string;
    }>;
    totalPages: number;
    total: number;
  }> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('search', query);
      
      if (params?.type) queryParams.append('type', params.type.join(','));
      if (params?.subtype) queryParams.append('subtype', params.subtype.join(','));
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.per_page) queryParams.append('per_page', params.per_page.toString());

      const response = await api.get(`/search?${queryParams.toString()}`);
      
      return {
        results: response.data,
        totalPages: parseInt(response.headers['x-wp-totalpages'] || '1'),
        total: parseInt(response.headers['x-wp-total'] || '0'),
      };
    } catch (error) {
      console.error('Error searching:', error);
      throw new Error('Failed to search');
    }
  }
}

export default WordPressAPI;