import { relations, sql } from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  jsonb,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
  inet,
  PgArray,
} from 'drizzle-orm/pg-core';

export const createTable = pgTableCreator((name) => `chanly_${name}`);

// Users Table
export const users = createTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  role: varchar('role', { length: 20 }).notNull().$type<'owner' | 'admin' | 'assistant'>(),
  phoneNumber: varchar('phone_number', { length: 20 }),
  isActive: boolean('is_active').default(true),
  emailVerified: boolean('email_verified').default(false),
  lastLogin: timestamp('last_login'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Categories Table
export const categories = createTable('category', {
  id: uuid('id').primaryKey().defaultRandom(),
  nameAr: varchar('name_ar', { length: 100 }).notNull(),
  nameEn: varchar('name_en', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  descriptionAr: text('description_ar'),
  descriptionEn: text('description_en'),
  icon: varchar('icon', { length: 50 }),
  color: varchar('color', { length: 7 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// Channels Table
export const channels = createTable('channel', {
  id: uuid('id').primaryKey().defaultRandom(),
  whatsappLink: varchar('whatsapp_link', { length: 255 }).notNull().unique(),
  inviteCode: varchar('invite_code', { length: 255 }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  avatarUrl: varchar('avatar_url', { length: 500 }),
  bannerUrl: varchar('banner_url', { length: 500 }),
  categoryId: uuid('category_id').references(() => categories.id),
  tags: jsonb('tags').default([]),
  memberCount: integer('member_count').default(0),
  isActive: boolean('is_active').default(true),
  isVerified: boolean('is_verified').default(false),
  lastChecked: timestamp('last_checked').defaultNow(),
  healthStatus: varchar('health_status', { length: 20 }).default('healthy').$type<'healthy' | 'broken' | 'checking'>(),
  adminNotes: text('admin_notes'),
  createdBy: uuid('created_by').references(() => users.id),
  claimedBy: uuid('claimed_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => {
  return {
    categoryIdx: index('channel_category_idx').on(table.categoryId),
    isActiveIdx: index('channel_is_active_idx').on(table.isActive),
    healthStatusIdx: index('channel_health_status_idx').on(table.healthStatus),
    createdAtIdx: index('channel_created_at_idx').on(table.createdAt.desc),
  };
});

// Channel Metadata Table
export const channelMetadata = createTable('channel_metadata', {
  id: uuid('id').primaryKey().defaultRandom(),
  channelId: uuid('channel_id').notNull().references(() => channels.id, { onDelete: 'cascade' }),
  rawData: jsonb('raw_data'),
  scrapedAt: timestamp('scraped_at').defaultNow(),
});

// Analytics Table
export const analytics = createTable('analytics', {
  id: uuid('id').primaryKey().defaultRandom(),
  channelId: uuid('channel_id').notNull().references(() => channels.id, { onDelete: 'cascade' }),
  userSession: varchar('user_session', { length: 255 }),
  eventType: varchar('event_type', { length: 50 }).notNull(),
  ipAddress: inet('ip_address'),
  userAgent: text('user_agent'),
  referrerUrl: varchar('referrer_url', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => {
  return {
    channelIdx: index('analytics_channel_idx').on(table.channelId),
    sessionIdx: index('analytics_session_idx').on(table.userSession),
    createdAtIdx: index('analytics_created_at_idx').on(table.createdAt),
  };
});

// Channel Claims Table
export const channelClaims = createTable('channel_claim', {
  id: uuid('id').primaryKey().defaultRandom(),
  channelId: uuid('channel_id').notNull().references(() => channels.id, { onDelete: 'cascade' }),
  claimantId: uuid('claimant_id').references(() => users.id),
  verificationCode: varchar('verification_code', { length: 20 }).notNull(),
  status: varchar('status', { length: 20 }).default('pending').$type<'pending' | 'verified' | 'rejected' | 'expired'>(),
  expiresAt: timestamp('expires_at').notNull(),
  verifiedAt: timestamp('verified_at'),
  adminReviewedBy: uuid('admin_reviewed_by').references(() => users.id),
  adminNotes: text('admin_notes'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => {
  return {
    channelIdx: index('channel_claim_channel_idx').on(table.channelId),
    statusIdx: index('channel_claim_status_idx').on(table.status),
  };
});

// Audit Logs Table
export const auditLogs = createTable('audit_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  action: varchar('action', { length: 100 }).notNull(),
  resourceType: varchar('resource_type', { length: 50 }),
  resourceId: uuid('resource_id'),
  oldValues: jsonb('old_values'),
  newValues: jsonb('new_values'),
  ipAddress: inet('ip_address'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => {
  return {
    userIdx: index('audit_log_user_idx').on(table.userId),
    createdAtIdx: index('audit_log_created_at_idx').on(table.createdAt.desc),
  };
});

// User Sessions Table
export const userSessions = createTable('user_session', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: varchar('session_id', { length: 255 }).notNull().unique(),
  userId: uuid('user_id').references(() => users.id),
  ipAddress: inet('ip_address'),
  userAgent: text('user_agent'),
  firstSeen: timestamp('first_seen').defaultNow(),
  lastSeen: timestamp('last_seen').defaultNow(),
  pageViews: integer('page_views').default(0),
});

// Newsletter Subscribers Table
export const newsletterSubscribers = createTable('newsletter_subscriber', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  isActive: boolean('is_active').default(true),
  preferences: jsonb('preferences'),
  subscribedAt: timestamp('subscribed_at').defaultNow(),
  unsubscribedAt: timestamp('unsubscribed_at'),
});

// Contact Messages Table
export const contactMessages = createTable('contact_message', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 255 }).notNull(),
  message: text('message').notNull(),
  status: varchar('status', { length: 20 }).default('new').$type<'new' | 'read' | 'replied'>(),
  repliedBy: uuid('replied_by').references(() => users.id),
  repliedAt: timestamp('replied_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations
export const channelsRelations = relations(channels, ({ one, many }) => ({
  category: one(categories, {
    fields: [channels.categoryId],
    references: [categories.id],
  }),
  creator: one(users, {
    fields: [channels.createdBy],
    references: [users.id],
  }),
  claimer: one(users, {
    fields: [channels.claimedBy],
    references: [users.id],
  }),
  metadata: many(channelMetadata),
  analytics: many(analytics),
  claims: many(channelClaims),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  channels: many(channels),
}));

export const usersRelations = relations(users, ({ many }) => ({
  createdChannels: many(channels),
  claimedChannels: many(channels),
  claims: many(channelClaims),
  auditLogs: many(auditLogs),
}));

export const analyticsRelations = relations(analytics, ({ one }) => ({
  channel: one(channels, {
    fields: [analytics.channelId],
    references: [channels.id],
  }),
}));

export const channelClaimsRelations = relations(channelClaims, ({ one }) => ({
  channel: one(channels, {
    fields: [channelClaims.channelId],
    references: [channels.id],
  }),
  claimant: one(users, {
    fields: [channelClaims.claimantId],
    references: [users.id],
  }),
}));
