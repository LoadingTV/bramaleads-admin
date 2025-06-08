// src/lib/api/articles.ts
// API endpoints for Articles management

// Database Types
interface DatabaseRow {
  [key: string]: string | number | boolean | null | undefined;
}

interface ArticleRow extends DatabaseRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  project_id: string;
  author_id: string;
  category: string;
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  featured: number; // boolean as int in DB
  cover_image_url: string;
  seo_title: string;
  seo_description: string;
  reading_time: number;
  view_count: number;
  like_count: number;
  published_at: string | null;
  scheduled_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  project_name?: string | null;
  project_domain?: string | null;
  author_name?: string | null;
  author_email?: string | null;
  tag_names?: string | null;
}

interface TagRow extends DatabaseRow {
  id: string;
  name: string;
  slug: string;
  usage_count: number;
}

interface CountRow extends DatabaseRow {
  total: number;
}

interface ProjectMemberRow extends DatabaseRow {
  user_id: string;
  role: string;
}

interface TagRelationRow extends DatabaseRow {
  name: string;
}

// API Types
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
  status?: 'draft' | 'published' | 'scheduled' | 'archived';
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

interface ArticleListResponse {
  articles: Article[];
  total: number;
  page: number;
  limit: number;
}

interface ArticleTag {
  name: string;
  slug: string;
  usageCount: number;
}

interface BulkActionResult {
  success: number;
  failed: number;
  errors: string[];
}

interface TrackViewData {
  source?: string;
  referrer?: string;
}

interface ActivityLogData {
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  oldValues?: Record<string, unknown>;
  newValues?: Record<string, unknown>;
}

interface NotificationData {
  title: string;
  message: string;
  type: string;
  category: string;
  relatedEntityType?: string;
  relatedEntityId?: string;
  actionUrl?: string;
}

// Database interface (mock - replace with your actual DB setup)
interface Database {
  query<T extends DatabaseRow = DatabaseRow>(query: string, params?: (string | number | boolean | null)[]): Promise<T[]>;
}

// Import or initialize your database instance here
// Example: import { database } from '../db';
declare const database: Database;

 
 

// GET /api/articles - List articles with filters
export async function getArticles(filters: ArticleFilters = {}): Promise<ArticleListResponse> {
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

  const params: (string | number | boolean)[] = [];

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
    params.push(featured ? 1 : 0);
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

  const articles = await database.query<ArticleRow>(query, params);

  // Get total count
  let countQuery = `
    SELECT COUNT(DISTINCT a.id) as total
    FROM articles a
    LEFT JOIN projects p ON a.project_id = p.id
    WHERE 1=1
  `;
  const countParams: (string | number | boolean)[] = [];

  // Apply same filters for count
  if (projectId) {
    countQuery += ` AND a.project_id = ?`;
    countParams.push(projectId);
  }

  if (status) {
    countQuery += ` AND a.status = ?`;
    countParams.push(status);
  }

  if (category) {
    countQuery += ` AND a.category = ?`;
    countParams.push(category);
  }

  if (authorId) {
    countQuery += ` AND a.author_id = ?`;
    countParams.push(authorId);
  }

  if (featured !== undefined) {
    countQuery += ` AND a.featured = ?`;
    countParams.push(featured ? 1 : 0);
  }

  if (search) {
    countQuery += ` AND (a.title LIKE ? OR a.excerpt LIKE ? OR a.content LIKE ?)`;
    const searchTerm = `%${search}%`;
    countParams.push(searchTerm, searchTerm, searchTerm);
  }

  if (tags && tags.length > 0) {
    const tagPlaceholders = tags.map(() => '?').join(',');
    countQuery += ` AND a.id IN (
      SELECT DISTINCT atr.article_id 
      FROM article_tag_relations atr 
      JOIN article_tags at ON atr.tag_id = at.id 
      WHERE at.name IN (${tagPlaceholders})
    )`;
    countParams.push(...tags);
  }

  const countResult = await database.query<CountRow>(countQuery, countParams);
  const total = countResult[0]?.total || 0;

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

  const articles = await database.query<ArticleRow>(query, [id]);
  const article = articles[0];
  
  if (!article) return null;

  // Get tags
  const tagQuery = `
    SELECT at.name
    FROM article_tags at
    JOIN article_tag_relations atr ON at.id = atr.tag_id
    WHERE atr.article_id = ?
  `;
  const tagResults = await database.query<TagRelationRow>(tagQuery, [id]);

  return {
    ...formatArticle(article),
    tags: tagResults.map(t => t.name)
  };
}

// POST /api/articles - Create new article
export async function createArticle(data: ArticleCreateRequest, authorId: string): Promise<Article> {
  // Check if slug is unique within the project
  const existingSlug = await database.query<{ id: string }>(
    'SELECT id FROM articles WHERE project_id = ? AND slug = ?',
    [data.projectId, data.slug]
  );

  if (existingSlug.length > 0) {
    throw new Error('Slug already exists in this project');
  }

  // Calculate reading time
  const readingTime = Math.ceil(data.content.split(' ').length / 200);

  const articleId = generateUUID();
  const now = new Date().toISOString();

  const articleData = {
    id: articleId,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt || '',
    content: data.content,
    project_id: data.projectId,
    author_id: authorId,
    category: data.category || '',
    status: data.status || 'draft',
    featured: data.featured ? 1 : 0,
    cover_image_url: data.coverImageUrl || '',
    seo_title: data.seoTitle || data.title,
    seo_description: data.seoDescription || data.excerpt || '',
    reading_time: readingTime,
    view_count: 0,
    like_count: 0,
    scheduled_at: data.scheduledAt || null,
    published_at: data.status === 'published' ? now : null,
    created_at: now,
    updated_at: now
  };

  // Insert article
  await database.query(`
    INSERT INTO articles (
      id, title, slug, excerpt, content, project_id, author_id, category,
      status, featured, cover_image_url, seo_title, seo_description,
      reading_time, view_count, like_count, scheduled_at, published_at, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    articleData.id,
    articleData.title,
    articleData.slug,
    articleData.excerpt,
    articleData.content,
    articleData.project_id,
    articleData.author_id,
    articleData.category,
    articleData.status,
    articleData.featured,
    articleData.cover_image_url,
    articleData.seo_title,
    articleData.seo_description,
    articleData.reading_time,
    articleData.view_count,
    articleData.like_count,
    articleData.scheduled_at,
    articleData.published_at,
    articleData.created_at,
    articleData.updated_at
  ]);

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

  const newArticle = await getArticle(articleData.id);
  if (!newArticle) {
    throw new Error('Failed to retrieve created article');
  }

  return newArticle;
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
    const existingSlug = await database.query<{ id: string }>(
      'SELECT id FROM articles WHERE project_id = ? AND slug = ? AND id != ?',
      [existingArticle.projectId, data.slug, id]
    );

    if (existingSlug.length > 0) {
      throw new Error('Slug already exists in this project');
    }
  }

  // Prepare update data
  const updateData: Record<string, string | number | null> = {
    updated_at: new Date().toISOString()
  };

  const fieldMapping: Record<string, string> = {
    title: 'title',
    slug: 'slug',
    excerpt: 'excerpt',
    content: 'content',
    category: 'category',
    status: 'status',
    featured: 'featured',
    coverImageUrl: 'cover_image_url',
    seoTitle: 'seo_title',
    seoDescription: 'seo_description',
    scheduledAt: 'scheduled_at'
  };

  Object.keys(fieldMapping).forEach(field => {
    const value = data[field as keyof ArticleUpdateRequest];
    if (value !== undefined) {
      const dbField = fieldMapping[field];
      if (field === 'featured') {
        updateData[dbField] = value ? 1 : 0;
      } else {
        updateData[dbField] = value as string | number | null;
      }
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

  await database.query(`UPDATE articles SET ${setClause} WHERE id = ?`, values);

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
    oldValues: { ...existingArticle },
    newValues: updateData
  });

  const updatedArticle = await getArticle(id);
  if (!updatedArticle) {
    throw new Error('Failed to retrieve updated article');
  }

  return updatedArticle;
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
  await database.query('DELETE FROM articles WHERE id = ?', [id]);

  // Create activity log
  await createActivityLog({
    userId,
    action: 'delete',
    entityType: 'article',
    entityId: id,
    oldValues: { ...article }
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

  const now = new Date().toISOString();
  await database.query(`
    UPDATE articles 
    SET status = 'published', published_at = ?, updated_at = ?
    WHERE id = ?
  `, [now, now, id]);

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

  const publishedArticle = await getArticle(id);
  if (!publishedArticle) {
    throw new Error('Failed to retrieve published article');
  }

  return publishedArticle;
}

// POST /api/articles/:id/analytics - Track article view
export async function trackArticleView(id: string, data: TrackViewData): Promise<void> {
  // Update view count
  await database.query('UPDATE articles SET view_count = view_count + 1 WHERE id = ?', [id]);

  // Record daily analytics
  const today = new Date().toISOString().split('T')[0];
  await database.query(`
    INSERT INTO article_analytics (article_id, date, views, unique_views, source, referrer)
    VALUES (?, ?, 1, 1, ?, ?)
    ON DUPLICATE KEY UPDATE 
      views = views + 1,
      unique_views = unique_views + 1
  `, [id, today, data.source || null, data.referrer || null]);
}

// GET /api/articles/tags - Get all tags
export async function getArticleTags(): Promise<ArticleTag[]> {
  const query = `
    SELECT at.name, at.slug, COUNT(atr.article_id) as usage_count
    FROM article_tags at
    LEFT JOIN article_tag_relations atr ON at.id = atr.tag_id
    GROUP BY at.id, at.name, at.slug
    ORDER BY usage_count DESC, at.name ASC
  `;

  const results = await database.query<TagRow>(query);
  return results.map(row => ({
    name: row.name,
    slug: row.slug,
    usageCount: row.usage_count
  }));
}

// POST /api/articles/bulk-action - Bulk operations
export async function bulkArticleAction(
  articleIds: string[], 
  action: 'publish' | 'unpublish' | 'delete' | 'archive',
  userId: string
): Promise<BulkActionResult> {
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
          await updateArticle(id, { id, status: 'draft' }, userId);
          break;
        case 'archive':
          await updateArticle(id, { id, status: 'archived' }, userId);
          break;
        case 'delete':
          await deleteArticle(id, userId);
          break;
      }
      success++;
    } catch (error) {
      failed++;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      errors.push(`Article ${id}: ${errorMessage}`);
    }
  }

  return { success, failed, errors };
}

// Helper functions
async function handleArticleTags(articleId: string, tags: string[]): Promise<void> {
  // Remove existing tags
  await database.query('DELETE FROM article_tag_relations WHERE article_id = ?', [articleId]);

  if (tags.length === 0) return;

  // Create tags if they don't exist and get their IDs
  const tagIds: string[] = [];
  
  for (const tagName of tags) {
    const slug = tagName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const tagId = generateUUID();
    
    // Insert tag if it doesn't exist
    await database.query(`
      INSERT INTO article_tags (id, name, slug, usage_count)
      VALUES (?, ?, ?, 1)
      ON DUPLICATE KEY UPDATE usage_count = usage_count + 1
    `, [tagId, tagName, slug]);

    // Get tag ID
    const tagResults = await database.query<{ id: string }>('SELECT id FROM article_tags WHERE slug = ?', [slug]);
    if (tagResults.length > 0) {
      tagIds.push(tagResults[0].id);
    }
  }

  // Create tag relations
  for (const tagId of tagIds) {
    await database.query(
      'INSERT INTO article_tag_relations (id, article_id, tag_id) VALUES (?, ?, ?)',
      [generateUUID(), articleId, tagId]
    );
  }
}

function formatArticle(row: ArticleRow): Article {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt || undefined,
    content: row.content,
    projectId: row.project_id,
    authorId: row.author_id,
    category: row.category || undefined,
    status: row.status,
    featured: Boolean(row.featured),
    coverImageUrl: row.cover_image_url || undefined,
    seoTitle: row.seo_title || undefined,
    seoDescription: row.seo_description || undefined,
    readingTime: row.reading_time || undefined,
    viewCount: row.view_count,
    likeCount: row.like_count,
    publishedAt: row.published_at || undefined,
    scheduledAt: row.scheduled_at || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    project: row.project_name ? {
      id: row.project_id,
      name: row.project_name,
      domain: row.project_domain || undefined
    } : undefined,
    author: row.author_name ? {
      id: row.author_id,
      name: row.author_name,
      email: row.author_email || ''
    } : undefined
  };
}

async function checkProjectPermission(userId: string, projectId: string, action: string): Promise<boolean> {
  // Simplified permission check - in real app, implement proper RBAC
  const memberResults = await database.query<ProjectMemberRow>(
    'SELECT role FROM project_members WHERE user_id = ? AND project_id = ?',
    [userId, projectId]
  );

  if (memberResults.length === 0) return false;

  const { role } = memberResults[0];
  
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

async function createActivityLog(data: ActivityLogData): Promise<void> {
  await database.query(`
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

async function notifyProjectMembers(projectId: string, notification: NotificationData): Promise<void> {
  const members = await database.query<{ user_id: string }>(
    'SELECT user_id FROM project_members WHERE project_id = ?',
    [projectId]
  );

  for (const member of members) {
    await database.query(`
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
// (Removed redundant export of already exported functions)

// Export types for use in other modules
export type {
  Article,
  ArticleCreateRequest,
  ArticleUpdateRequest,
  ArticleFilters,
  ArticleListResponse,
  ArticleTag,
  BulkActionResult,
  TrackViewData
};