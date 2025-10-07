interface WordPressLink {
  href: string;
  embeddable?: boolean;
  count?: number;
  taxonomy?: string;
  targetHints?: {
    allow: string[];
  };
  templated?: boolean;
  name?: string;
}

interface WordPressLinks {
  self?: WordPressLink[];
  collection?: WordPressLink[];
  about?: WordPressLink[];
  author?: WordPressLink[];
  replies?: WordPressLink[];
  "version-history"?: WordPressLink[];
  "wp:attachment"?: WordPressLink[];
  "wp:term"?: WordPressLink[];
  curies?: WordPressLink[];
  [key: string]: WordPressLink[] | undefined;
}

export interface WordPressPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: {
    footnotes: string;
    [key: string]: string | number | boolean;
  };
  categories: number[];
  tags: number[];
  class_list: string[];
  _links: WordPressLinks;
}

export interface WordPressPage {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  menu_order: number;
  template: string;
  meta: {
    footnotes: string;
    [key: string]: string | number | boolean;
  };
  parent: number;
  _links: WordPressLinks;
}

export interface WordPressCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  meta: Record<string, string | number | boolean>[];
  _links: WordPressLinks;
}

export interface WordPressTag {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  meta: Record<string, string | number | boolean>[];
  _links: WordPressLinks;
}

export interface WordPressMedia {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  author: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: Record<string, string | number | boolean>[];
  description: {
    rendered: string;
  };
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    sizes: {
      [key: string]: {
        file: string;
        width: number;
        height: number;
        mime_type: string;
        source_url: string;
      };
    };
    image_meta: Record<string, string | number | boolean>;
  };
  source_url: string;
  _links: WordPressLinks;
}

export interface WordPressAuthor {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls: {
    [key: string]: string;
  };
  meta: Record<string, string | number | boolean>[];
  _links: WordPressLinks;
}