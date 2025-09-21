import { Permission } from '../../modules/user/entities/permission.entity';
import { AppDataSource } from '../data-source';

export const permissionsToSeed: Array<Array<{name: string, description: string}>> = [
  [
    { name: 'get.authUser', description: 'View heroes' },
  ],
  [
    // Hero module - Admin only
    { name: 'get.hero', description: 'View heroes' },
    { name: 'create.hero', description: 'Create hero' },
    { name: 'update.hero', description: 'Update hero' },
    { name: 'delete.hero', description: 'Delete hero' },

    // Event module - Admin only
    { name: 'get.event', description: 'View Events' },
    { name: 'create.event', description: 'Create event' },
    { name: 'update.event', description: 'Update event' },
    { name: 'delete.event', description: 'Delete event' },

    // Item tag module - Admin only
    { name: 'get.itemTag', description: 'View Item Tags' },
    { name: 'create.itemTag', description: 'Create item tag' },
    { name: 'update.itemTag', description: 'Update item tag' },
    { name: 'delete.itemTag', description: 'Delete item tag' },

    // Ministry module - Admin only
    { name: 'get.ministry', description: 'View ministries' },
    { name: 'create.ministry', description: 'Create ministry' },
    { name: 'update.ministry', description: 'Update ministry' },
    { name: 'delete.ministry', description: 'Delete ministry' },

    // Sermon module - Admin only
    { name: 'get.sermon', description: 'View sermons' },
    { name: 'create.sermon', description: 'Create sermon' },
    { name: 'update.sermon', description: 'Update sermon' },
    { name: 'delete.sermon', description: 'Delete sermon' },

    // Gallery module - Admin only
    { name: 'get.gallery', description: 'View gallery items' },
    { name: 'create.gallery', description: 'Create gallery item' },
    { name: 'update.gallery', description: 'Update gallery item' },
    { name: 'delete.gallery', description: 'Delete gallery item' },

    // About module - Admin only
    { name: 'get.about', description: 'View about sections' },
    { name: 'create.about', description: 'Create about section' },
    { name: 'update.about', description: 'Update about section' },
    { name: 'delete.about', description: 'Delete about section' },

    // Pastor module - Admin only
    { name: 'get.pastor', description: 'View pastor info' },
    { name: 'create.pastor', description: 'Create pastor' },
    { name: 'update.pastor', description: 'Update pastor' },
    { name: 'delete.pastor', description: 'Delete pastor' },

    // ContactInfo module - Admin only
    { name: 'get.contactInfo', description: 'View contact information' },
    { name: 'create.contactInfo', description: 'Create contact info' },
    { name: 'update.contactInfo', description: 'Update contact info' },
    { name: 'delete.contactInfo', description: 'Delete contact info' },

    // CallToAction module - Admin only
    { name: 'get.callToAction', description: 'View call to action' },
    { name: 'create.callToAction', description: 'Create call to action' },
    { name: 'update.callToAction', description: 'Update call to action' },
    { name: 'delete.callToAction', description: 'Delete call to action' },

    // Footer module - Admin only
    { name: 'get.footer', description: 'View footer' },
    { name: 'create.footer', description: 'Create footer' },
    { name: 'update.footer', description: 'Update footer' },
    { name: 'delete.footer', description: 'Delete footer' },

    // Statistics module - Admin only
    { name: 'get.statistics', description: 'View statistics' },
    { name: 'create.statistics', description: 'Create statistics' },
    { name: 'update.statistics', description: 'Update statistics' },
    { name: 'delete.statistics', description: 'Delete statistics' },

    // Belief module - Admin only
    { name: 'get.belief', description: 'View beliefs' },
    { name: 'create.belief', description: 'Create belief' },
    { name: 'update.belief', description: 'Update belief' },
    { name: 'delete.belief', description: 'Delete belief' },

    // GrowingInFaith module - Admin only
    { name: 'get.growInFaith', description: 'View growing in faith' },
    { name: 'create.growInFaith', description: 'Create growing in faith entry' },
    { name: 'update.growInFaith', description: 'Update growing in faith entry' },
    { name: 'delete.growInFaith', description: 'Delete growing in faith entry' },

    // SocialLink module - Admin only
    { name: 'get.socialLink', description: 'View social links' },
    { name: 'create.socialLink', description: 'Create social link' },
    { name: 'update.socialLink', description: 'Update social link' },
    { name: 'delete.socialLink', description: 'Delete social link' },

    // Site link module - Admin only
    { name: 'get.siteLink', description: 'View site links' },
    { name: 'create.siteLink', description: 'Create site link' },
    { name: 'update.siteLink', description: 'Update site link' },
    { name: 'delete.siteLink', description: 'Delete site link' },
    
    // Get config for entity - Admin can access
    { name: 'getEntity.config', description: 'Get config for entity' },

    // Retrieve and Update Payment Options - Admin can access
    { name: 'get.paymentOption', description: 'View Payment Options' },
    { name: 'update.paymentOption', description: 'Update Payment Options' },

    // Giving Area - Admin can access
    { name: 'get.givingArea', description: 'View Giving Areas' },
    { name: 'create.givingArea', description: 'Update Giving Areas' },
    { name: 'update.givingArea', description: 'View Giving Areas' },
    { name: 'delete.givingArea', description: 'Update Giving Areas' },

    // Watch Live - Admin can access
    { name: 'get.live', description: 'View Watch Live' },
    { name: 'create.live', description: 'Update Watch Live' },
    { name: 'update.live', description: 'View Watch Live' },
    { name: 'delete.live', description: 'Update Watch Live' },
    
    // Dropdown list - Admin can access
    { name: 'get.dropdown-list', description: 'Access dropdown list content' },
    
    // Story Stat - Admin can access
    { name: 'get.storyStat', description: 'Get Story Stat' },
    { name: 'create.storyStat', description: 'Create Story Stat' },
    { name: 'update.storyStat', description: 'Update Story Stat' },
    { name: 'delete.storyStat', description: 'Delete Story Stat' },

    // Scheduled Program - Admin can access
    { name: 'get.scheduledProgram', description: 'Get Scheduled Program' },
    { name: 'create.scheduledProgram', description: 'Create Scheduled Program' },
    { name: 'update.scheduledProgram', description: 'Update Scheduled Program' },
    { name: 'delete.scheduledProgram', description: 'Delete Scheduled Program' },

    // Value Item - Admin can access
    { name: 'get.valueItem', description: 'get Value Item' },
    { name: 'create.valueItem', description: 'Create Value Item' },
    { name: 'update.valueItem', description: 'Update Value Item' },
    { name: 'delete.valueItem', description: 'Delete Value Item' },
  ],
  [
    // User Management - Only super_admin
    { name: 'get.user', description: 'View users (super admin only)' },
    { name: 'create.user', description: 'Create user (super admin only)' },
    { name: 'update.user', description: 'Update user (super admin only)' },
    { name: 'delete.user', description: 'Delete user (super admin only)' },
  
    // Role Management - Only super_admin
    { name: 'get.role', description: 'View roles (super admin only)' },
    { name: 'create.role', description: 'Create role (super admin only)' },
    { name: 'update.role', description: 'Update role (super admin only)' },
    { name: 'delete.role', description: 'Delete role (super admin only)' },
  
    // Permission Management - Only super_admin
    { name: 'get.permission', description: 'View permissions (super admin only)' },
    { name: 'create.permission', description: 'Create permission (super admin only)' },
    { name: 'update.permission', description: 'Update permission (super admin only)' },
    { name: 'delete.permission', description: 'Delete permission (super admin only)' },
  
    // Admin Config Read - Admin access
    { name: 'get.config', description: 'View configs (system admin only)' },
  ],
  [
    // Create and Delete Payment Options
    { name: 'create.paymentOption', description: 'Create Payment Options' },
    { name: 'delete.paymentOption', description: 'Delete Payment Options' },

    // Admin Config Managements  - Only system_admin
    { name: 'create.config', description: 'Create config (system admin only)' },
    { name: 'update.config', description: 'Update config (system admin only)' },
    { name: 'delete.config', description: 'Delete config (system admin only)' },
    
    // User Login History - Only system admin
    { name: 'get.login', description: 'Login History for all users (system admin only)' },
    { name: 'get.userLogin', description: 'Login History for specific user (system admin only)' },
  ]
];

export async function seedPermissions() {
  const permissionRepo = AppDataSource.getRepository(Permission);
  const permissions = permissionsToSeed.map(perm => permissionRepo.create(perm));
  await permissionRepo.save(permissions.flat());
  console.log('Seeded Permissions');
}
