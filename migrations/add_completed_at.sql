-- Run this SQL in Supabase Dashboard > SQL Editor

-- Add completed_at column to tasks table
ALTER TABLE tasks 
ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE;

-- Optional: Update existing completed tasks with a default completed_at
-- (using current timestamp - you can adjust this)
UPDATE tasks 
SET completed_at = NOW() 
WHERE status = 'Done' AND completed_at IS NULL;
