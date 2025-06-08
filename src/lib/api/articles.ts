// src/lib/api/articles.ts
// API endpoints for Articles management

import { NextRequest, NextResponse } from 'next/server';

// Types
interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  projectId: string;
  authorId: string;
  category?: string;
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  featured: boolean;
  coverImageUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  readingTime?: number;
  viewCount: number;
  likeCount: number;
  publishedAt?: string;
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  project?: {
    id: string;
    name: string;
    domain?: string;
  };
  author?: {
    id: string;
    name: string;
    email: string;
  };
}

interface ArticleCreateRequest {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  projectId: string;
  category?: string;
  status?: 'draft' | 'published' | 'scheduled';
  featured?: boolean;
  coverImageUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
  scheduledAt?: string;
}

interface ArticleUpdateRequest extends Partial<ArticleCreateRequest> {
  id: string;
}

interface ArticleFilters {
  projectId?: string;
  status?: string;
  category?: string;
  authorId?: string;
  featured?: boolean;
  search?: string;
  tags?: string[];
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'publishedAt' | 'title' | 'viewCount';
  sortOrder?: 'asc' | 'desc';
}

// Database connection (placeholder - replace with your actual DB setup)
import { db } from '@/lib/database';

// GET /api/articles - List articles with filters
export async function getArticles(filters: ArticleFilters = {}): Promise<{ articles: Article[]; total: number; page: number; limit: number }> {
  const {
    projectId,
    status,
    category,
    authorId,
    featured,
    search,
    tags,
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = filters;

  let query = `
    SELECT 
      a.*,
      p.name as project_name,
      p.domain as project_domain,
      u.full_name as author_name,
      u.email as author_email,
      GROUP_CONCAT(at.name) as tag_names
    FROM articles a
    LEFT JOIN projects p ON a.project_id = p.id
    LEFT JOIN users u ON a.author_id = u.id
    LEFT JOIN article_tag_relations atr ON a.id = atr.article_id
    LEFT JOIN article_tags at ON atr.tag_id = at.id
    WHERE 1=1
  `;

  const params: any[] = [];

  if (projectId) {
    query += ` AND a.project_id = ?`;
    params.push(projectId);
  }

  if (status) {
    query += ` AND a.status = ?`;
    params.push(status);
  }

  if (category) {
    query += ` AND a.category = ?`;
    params.push(category);
  }

  if (authorId) {
    query += ` AND a.author_id = ?`;
    params.push(authorId);
  }

  if (featured !== undefined) {
    query += ` AND a.featured = ?`;
    params.push(featured);
  }

  if (search) {
    query += ` AND (a.title LIKE ? OR a.excerpt LIKE ? OR a.content LIKE ?)`;
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }

  if (tags && tags.length > 0) {
    const tagPlaceholders = tags.map(() => '?').join(',');
    query += ` AND a.id IN (
      SELECT DISTINCT atr.article_id 
      FROM article_tag_relations atr 
      JOIN article_tags at ON atr.tag_id = at.id 
      WHERE at.name IN (${tagPlaceholders})
    )`;
    params.push(...tags);
  }

  query += ` GROUP BY a.id`;
  query += ` ORDER BY a.${sortBy} ${sortOrder.toUpperCase()}`;
  query += ` LIMIT ? OFFSET ?`;
  params.push(limit, (page - 1) * limit);

  const articles = await db.query(query, params);

  // Get total count
  let countQuery = `
    SELECT COUNT(DISTINCT a.id) as total
    FROM articles a
    LEFT JOIN projects p ON a.project_id = p.id
    WHERE 1=1
  `;
  const countParams: any[] = [];

  // Apply same filters for count
  if (projectId) {
    countQuery += ` AND a.project_id = ?`;
    countParams.push(projectId);
  }
  // ... (repeat other filters)

  const [{ total }] = await db.query(countQuery, countParams);

  return {
    articles: articles.map(formatArticle),
    total,
    page,
    limit
  };
}

// GET /api/articles/:id - Get single article
export async function getArticle(id: string): Promise<Article | null> {
  const query = `
    SELECT 
      a.*,
      p.name as project_name,
      p.domain as project_domain,
      u.full_name as author_name,
      u.email as author_email
    FROM articles a
    LEFT JOIN projects p ON a.project_id = p.id
    LEFT JOIN users u ON a.author_id = u.id
    WHERE a.id = ?
  `;

  const [article] = await db.query(query, [id]);
  if (!article) return null;

  // Get tags
  const tagQuery = `
    SELECT at.name
    FROM article_tags at
    JOIN article_tag_relations atr ON at.id = atr.tag_id
    WHERE atr.article_id = ?
  `;
  const tags = await db.query(tagQuery, [id]);

  return {
    ...formatArticle(article),
    tags: tags.map((t: any) => t.name)
  };
}

// POST /api/articles - Create new article
export async function createArticle(data: ArticleCreateRequest, authorId: string): Promise<Article> {
  // Check if slug is unique within the project
  const existingSlug = await db.query(
    'SELECT id FROM articles WHERE project_id = ? AND slug = ?',
    [data.projectId, data.slug]
  );

  if (existingSlug.length > 0) {
    throw new Error('Slug already exists in this project');
  }

  // Calculate reading time
  const readingTime = Math.ceil(data.content.split(' ').length / 200);

  const articleData = {
    id: generateUUID(),
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt || '',
    content: data.content,
    project_id: data.projectId,
    author_id: authorId,
    category: data.category || '',
    status: data.status || 'draft',
    featured: data.featured || false,
    cover_image_url: data.coverImageUrl || '',
    seo_title: data.seoTitle || data.title,
    seo_description: data.seoDescription || data.excerpt || '',
    reading_time: readingTime,
    scheduled_at: data.scheduledAt || null,
    published_at: data.status === 'published' ? new Date().toISOString() : null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  // Insert article
  await db.query(`
    INSERT INTO articles (
      id, title, slug, excerpt, content, project_id, author_id, category,
      status, featured, cover_image_url, seo_title, seo_description,
      reading_time, scheduled_at, published_at, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, Object.values(articleData));

  // Handle tags
  if (data.tags && data.tags.length > 0) {
    await handleArticleTags(articleData.id, data.tags);
  }

  // Create activity log
  await createActivityLog({
    userId: authorId,
    action: 'create',
    entityType: 'article',
    entityId: articleData.id,
    newValues: articleData
  });

  return await getArticle(articleData.id) as Article;
}

// PUT /api/articles/:id - Update article
export async function updateArticle(id: string, data: ArticleUpdateRequest, userId: string): Promise<Article> {
  // Get existing article
  const existingArticle = await getArticle(id);
  if (!existingArticle) {
    throw new Error('Article not found');
  }

  // Check permissions (simplified - in real app, check user permissions)
  if (existingArticle.author?.id !== userId) {
    // Check if user has edit permissions for the project
    const hasPermission = await checkProjectPermission(userId, existingArticle.projectId, 'edit');
    if (!hasPermission) {
      throw new Error('Permission denied');
    }
  }

  // Check slug uniqueness if changed
  if (data.slug && data.slug !== existingArticle.slug) {
    const existingSlug = await db.query(
      'SELECT id FROM articles WHERE project_id = ? AND slug = ? AND id != ?',
      [existingArticle.projectId, data.slug, id]
    );

    if (existingSlug.length > 0) {
      throw new Error('Slug already exists in this project');
    }
  }

  // Prepare update data
  const updateData: any = {
    updated_at: new Date().toISOString()
  };

  const allowedFields = [
    'title', 'slug', 'excerpt', 'content', 'category', 'status', 
    'featured', 'coverImageUrl', 'seoTitle', 'seoDescription', 'scheduledAt'
  ];

  allowedFields.forEach(field => {
    if (data[field as keyof ArticleUpdateRequest] !== undefined) {
      const dbField = field.replace(/([A-Z])/g, '_$1').toLowerCase();
      updateData[dbField] = data[field as keyof ArticleUpdateRequest];
    }
  });

  // Update reading time if content changed
  if (data.content) {
    updateData.reading_time = Math.ceil(data.content.split(' ').length / 200);
  }

  // Handle status changes
  if (data.status === 'published' && existingArticle.status !== 'published') {
    updateData.published_at = new Date().toISOString();
  }

  // Build update query
  const setClause = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
  const values = [...Object.values(updateData), id];

  await db.query(`UPDATE articles SET ${setClause} WHERE id = ?`, values);

  // Handle tags if provided
  if (data.tags !== undefined) {
    await handleArticleTags(id, data.tags);
  }

  // Create activity log
  await createActivityLog({
    userId,
    action: 'update',
    entityType: 'article',
    entityId: id,
    oldValues: existingArticle,
    newValues: updateData
  });

  return await getArticle(id) as Article;
}

// DELETE /api/articles/:id - Delete article
export async function deleteArticle(id: string, userId: string): Promise<void> {
  const article = await getArticle(id);
  if (!article) {
    throw new Error('Article not found');
  }

  // Check permissions
  if (article.author?.id !== userId) {
    const hasPermission = await checkProjectPermission(userId, article.projectId, 'delete');
    if (!hasPermission) {
      throw new Error('Permission denied');
    }
  }

  // Delete article and related data (cascading deletes handle most relations)
  await db.query('DELETE FROM articles WHERE id = ?', [id]);

  // Create activity log
  await createActivityLog({
    userId,
    action: 'delete',
    entityType: 'article',
    entityId: id,
    oldValues: article
  });
}

// POST /api/articles/:id/publish - Publish article
export async function publishArticle(id: string, userId: string): Promise<Article> {
  const article = await getArticle(id);
  if (!article) {
    throw new Error('Article not found');
  }

  if (article.status === 'published') {
    throw new Error('Article is already published');
  }

  // Check permissions
  if (article.author?.id !== userId) {
    const hasPermission = await checkProjectPermission(userId, article.projectId, 'publish');
    if (!hasPermission) {
      throw new Error('Permission denied');
    }
  }

  await db.query(`
    UPDATE articles 
    SET status = 'published', published_at = ?, updated_at = ?
    WHERE id = ?
  `, [new Date().toISOString(), new Date().toISOString(), id]);

  // Create activity log
  await createActivityLog({
    userId,
    action: 'publish',
    entityType: 'article',
    entityId: id
  });

  // Send notifications to project members
  await notifyProjectMembers(article.projectId, {
    title: 'New Article Published',
    message: `"${article.title}" has been published`,
    type: 'info',
    category: 'article',
    relatedEntityType: 'article',
    relatedEntityId: id,
    actionUrl: `/articles/${id}`
  });

  return await getArticle(id) as Article;
}

// POST /api/articles/:id/analytics - Track article view
export async function trackArticleView(id: string, data: { source?: string; referrer?: string }): Promise<void> {
  // Update view count
  await db.query('UPDATE articles SET view_count = view_count + 1 WHERE id = ?', [id]);

  // Record daily analytics
  const today = new Date().toISOString().split('T')[0];
  await db.query(`
    INSERT INTO article_analytics (article_id, date, views, unique_views)
    VALUES (?, ?, 1, 1)
    ON DUPLICATE KEY UPDATE 
      views = views + 1,
      unique_views = unique_views + 1
  `, [id, today]);
}

// GET /api/articles/tags - Get all tags
export async function getArticleTags(): Promise<Array<{ name: string; slug: string; usageCount: number }>> {
  const query = `
    SELECT at.*, COUNT(atr.article_id) as usage_count
    FROM article_tags at
    LEFT JOIN article_tag_relations atr ON at.id = atr.tag_id
    GROUP BY at.id
    ORDER BY usage_count DESC, at.name ASC
  `;

  return await db.query(query);
}

// POST /api/articles/bulk-action - Bulk operations
export async function bulkArticleAction(
  articleIds: string[], 
  action: 'publish' | 'unpublish' | 'delete' | 'archive',
  userId: string
): Promise<{ success: number; failed: number; errors: string[] }> {
  let success = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const id of articleIds) {
    try {
      switch (action) {
        case 'publish':
          await publishArticle(id, userId);
          break;
        case 'unpublish':
          await updateArticle(id, { status: 'draft' }, userId);
          break;
        case 'archive':
          await updateArticle(id, { status: 'archived' }, userId);
          break;
        case 'delete':
          await deleteArticle(id, userId);
          break;
      }
      success++;
    } catch (error) {
      failed++;
      errors.push(`Article ${id}: ${error.message}`);
    }
  }

  return { success, failed, errors };
}

// Helper functions
async function handleArticleTags(articleId: string, tags: string[]): Promise<void> {
  // Remove existing tags
  await db.query('DELETE FROM article_tag_relations WHERE article_id = ?', [articleId]);

  if (tags.length === 0) return;

  // Create tags if they don't exist and get their IDs
  const tagIds: string[] = [];
  
  for (const tagName of tags) {
    const slug = tagName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    
    // Insert tag if it doesn't exist
    await db.query(`
      INSERT INTO article_tags (id, name, slug, usage_count)
      VALUES (?, ?, ?, 1)
      ON DUPLICATE KEY UPDATE usage_count = usage_count + 1
    `, [generateUUID(), tagName, slug]);

    // Get tag ID
    const [tag] = await db.query('SELECT id FROM article_tags WHERE slug = ?', [slug]);
    tagIds.push(tag.id);
  }

  // Create tag relations
  for (const tagId of tagIds) {
    await db.query(
      'INSERT INTO article_tag_relations (id, article_id, tag_id) VALUES (?, ?, ?)',
      [generateUUID(), articleId, tagId]
    );
  }
}

function formatArticle(row: any): Article {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    projectId: row.project_id,
    authorId: row.author_id,
    category: row.category,
    status: row.status,
    featured: Boolean(row.featured),
    coverImageUrl: row.cover_image_url,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    readingTime: row.reading_time,
    viewCount: row.view_count,
    likeCount: row.like_count,
    publishedAt: row.published_at,
    scheduledAt: row.scheduled_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    project: row.project_name ? {
      id: row.project_id,
      name: row.project_name,
      domain: row.project_domain
    } : undefined,
    author: row.author_name ? {
      id: row.author_id,
      name: row.author_name,
      email: row.author_email
    } : undefined
  };
}

async function checkProjectPermission(userId: string, projectId: string, action: string): Promise<boolean> {
  // Simplified permission check - in real app, implement proper RBAC
  const [membership] = await db.query(
    'SELECT role FROM project_members WHERE user_id = ? AND project_id = ?',
    [userId, projectId]
  );

  if (!membership) return false;

  const { role } = membership;
  
  switch (action) {
    case 'edit':
      return ['owner', 'editor', 'contributor'].includes(role);
    case 'delete':
    case 'publish':
      return ['owner', 'editor'].includes(role);
    default:
      return false;
  }
}

async function createActivityLog(data: {
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  oldValues?: any;
  newValues?: any;
}): Promise<void> {
  await db.query(`
    INSERT INTO audit_logs (id, user_id, action, entity_type, entity_id, old_values, new_values, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    generateUUID(),
    data.userId,
    data.action,
    data.entityType,
    data.entityId,
    JSON.stringify(data.oldValues || {}),
    JSON.stringify(data.newValues || {}),
    new Date().toISOString()
  ]);
}

async function notifyProjectMembers(projectId: string, notification: {
  title: string;
  message: string;
  type: string;
  category: string;
  relatedEntityType?: string;
  relatedEntityId?: string;
  actionUrl?: string;
}): Promise<void> {
  const members = await db.query(
    'SELECT user_id FROM project_members WHERE project_id = ?',
    [projectId]
  );

  for (const member of members) {
    await db.query(`
      INSERT INTO notifications (id, user_id, title, message, type, category, related_entity_type, related_entity_id, action_url, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      generateUUID(),
      member.user_id,
      notification.title,
      notification.message,
      notification.type,
      notification.category,
      notification.relatedEntityType || null,
      notification.relatedEntityId || null,
      notification.actionUrl || null,
      new Date().toISOString()
    ]);
  }
}

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Export all functions for use in API routes
export {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  publishArticle,
  trackArticleView,
  getArticleTags,
  bulkArticleAction
};