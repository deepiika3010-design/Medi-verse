-- Drop the overly permissive public policy
DROP POLICY IF EXISTS "Anyone can view profiles" ON public.profiles;

-- Create a secure policy: authenticated users can view all profiles (needed for doctor listings)
CREATE POLICY "Authenticated users can view profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);

-- Users can view their own profile even if not fully authenticated
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = user_id);