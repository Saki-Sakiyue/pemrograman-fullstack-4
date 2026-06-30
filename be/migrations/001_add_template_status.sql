-- Migration: Add approval status field to templates table
-- Date: 2026-07-01
-- Description: Add status enum field for template approval workflow

ALTER TABLE templates 
ADD COLUMN status ENUM('pending', 'approved', 'rejected') 
DEFAULT 'pending' 
AFTER is_active;

-- Update existing templates to 'approved' (assume current templates are already approved)
UPDATE templates 
SET status = 'approved' 
WHERE is_active = 1 AND deleted_at IS NULL;

-- Optional: Update inactive templates to 'rejected'
UPDATE templates 
SET status = 'rejected' 
WHERE is_active = 0 AND deleted_at IS NULL;
