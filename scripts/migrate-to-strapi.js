#!/usr/bin/env node

/**
 * Data Migration Script for Strapi
 * 
 * This script migrates your existing JSON data to Strapi.
 * Run this after setting up your Strapi content types.
 * 
 * Usage:
 * 1. Make sure Strapi is running: cd server && npm run develop
 * 2. Run this script: node scripts/migrate-to-strapi.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const DATA_DIR = path.join(__dirname, '../web/src/app/data/staff'); // For the moment only for staff

// Helper function to make API calls
async function strapiAPI(endpoint, method = 'GET', data = null) {
  const url = `${STRAPI_URL}/api${endpoint}`;
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify({ data });
  }

  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API call failed (${response.status}): ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error calling ${endpoint}:`, error.message);
    throw error;
  }
}

// Check if Strapi is running
async function checkStrapi() {
  try {
    const response = await fetch(`${STRAPI_URL}/admin`);
    return response.ok;
  } catch {
    return false;
  }
}

// Read JSON file safely
function readJSONFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

// Migrate staff data
async function migrateStaff() {
  console.log('📊 Migrating staff data...');
  
  const staffFile = path.join(DATA_DIR, 'staffData.json');
  const staffData = readJSONFile(staffFile);
  
  if (!staffData) {
    console.error('❌ Could not read staff data');
    return false;
  }

  // Flatten staff data (Personal + Researchers)
  const allStaff = [
    ...(Array.isArray(staffData.Personal) ? staffData.Personal : []),
    ...(Array.isArray(staffData.Researchers) ? staffData.Researchers : [])
  ];

  console.log(`   Found ${allStaff.length} staff members to migrate`);

  let successCount = 0;
  let errorCount = 0;

  for (const staff of allStaff) {
    try {
      // Transform data for Strapi
      const strapiData = {
        slug: staff.slug,
        name: staff.name,
        title: staff.title,
        phone: staff.phone,
        email: staff.email,
        department: staff.department,
        // image: staff.image,
        // publishedAt: new Date().toISOString(),
      };

      await strapiAPI('/staffs', 'POST', strapiData);
      console.log(`   ✅ Migrated: ${staff.name}`);
      successCount++;
    } catch (error) {
      console.log(`   ❌ Failed: ${staff.name} - ${error.message}`);
      errorCount++;
    }
  }

  console.log(`📊 Staff migration complete: ${successCount} success, ${errorCount} errors`);
  return errorCount === 0;
}

// Migrate publications
async function migratePublications() {
  console.log('📚 Migrating publications...');
  
  const pubFile = path.join(DATA_DIR, 'pubData.json');
  const pubData = readJSONFile(pubFile);
  
  if (!Array.isArray(pubData)) {
    console.error('❌ Could not read publications data');
    return false;
  }

  console.log(`   Found ${pubData.length} publications to migrate`);

  let successCount = 0;
  let errorCount = 0;

  for (const pub of pubData) {
    try {
      const strapiData = {
        title: pub.title,
        year: pub.year,
        domain: pub.domain,
        kind: pub.kind,
        description: pub.description,
        authors: pub.authors || [],
        docUrl: pub.docUrl,
        publishedAt: new Date().toISOString(),
      };

      await strapiAPI('/publications', 'POST', strapiData);
      console.log(`   ✅ Migrated: ${pub.title}`);
      successCount++;
    } catch (error) {
      console.log(`   ❌ Failed: ${pub.title} - ${error.message}`);
      errorCount++;
    }
  }

  console.log(`📚 Publications migration complete: ${successCount} success, ${errorCount} errors`);
  return errorCount === 0;
}

// Migrate projects
async function migrateProjects() {
  console.log('📁 Migrating projects...');
  
  const projectFile = path.join(DATA_DIR, 'proData.json');
  const projectData = readJSONFile(projectFile);
  
  if (!Array.isArray(projectData)) {
    console.error('❌ Could not read projects data');
    return false;
  }

  console.log(`   Found ${projectData.length} projects to migrate`);

  let successCount = 0;
  let errorCount = 0;

  for (const project of projectData) {
    try {
      const strapiData = {
        title: project.title,
        lead: project.lead,
        abstract: project.abstract,
        themes: project.themes || [],
        teams: project.teams || [],
        region: project.region,
        domain: project.domain || [],
        partners: project.partners || [],
        docUrl: project.docUrl,
        oficialUrl: project.oficialUrl,
        publishedAt: new Date().toISOString(),
      };

      await strapiAPI('/projects', 'POST', strapiData);
      console.log(`   ✅ Migrated: ${project.title}`);
      successCount++;
    } catch (error) {
      console.log(`   ❌ Failed: ${project.title} - ${error.message}`);
      errorCount++;
    }
  }

  console.log(`📁 Projects migration complete: ${successCount} success, ${errorCount} errors`);
  return errorCount === 0;
}

// Main migration function
async function main() {
  console.log('🚀 Starting data migration to Strapi...');
  console.log(`   Strapi URL: ${STRAPI_URL}`);
  console.log(`   Data directory: ${DATA_DIR}`);
  
  // Check if Strapi is running
  const strapiRunning = await checkStrapi();
  if (!strapiRunning) {
    console.error('❌ Strapi is not running! Please start it first:');
    console.error('   cd server && npm run develop');
    process.exit(1);
  }
  
  console.log('✅ Strapi is running');
  
  try {
    // Migrate all data types
    const staffSuccess = await migrateStaff();
    const pubSuccess = await migratePublications();
    const projectSuccess = await migrateProjects();
    
    if (staffSuccess && pubSuccess && projectSuccess) {
      console.log('🎉 Migration completed successfully!');
      console.log('');
      console.log('Next steps:');
      console.log('1. Visit http://localhost:1337/admin to verify the data');
      console.log('2. Test your Next.js app with the new Strapi integration');
      console.log('3. Update your deployment configuration to use Strapi');
    } else {
      console.log('⚠️  Migration completed with some errors');
      console.log('Please check the logs above and fix any issues');
    }
    
  } catch (error) {
    console.error('💥 Migration failed:', error.message);
    process.exit(1);
  }
}

// Run the migration
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  main,
  migrateStaff,
  migratePublications,
  migrateProjects,
};
