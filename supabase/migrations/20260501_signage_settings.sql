-- 1. Create the table for managing signage status
CREATE TABLE public.signage_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    override_status TEXT CHECK (override_status IN ('auto', 'preparing', 'open_day', 'open_night', 'closed')),
    custom_message TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Insert default row
INSERT INTO public.signage_settings (override_status, custom_message) 
VALUES ('auto', NULL);

-- 3. Setup RLS
ALTER TABLE public.signage_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read the signage status
CREATE POLICY "Public can read signage settings" ON public.signage_settings
    FOR SELECT USING (true);

-- Only authenticated admins can update
CREATE POLICY "Admins can update signage settings" ON public.signage_settings
    FOR UPDATE USING (auth.uid() IN (SELECT user_id FROM public.admins));
    
-- Note: we only need one row, so we don't strictly need insert/delete policies for normal operation
