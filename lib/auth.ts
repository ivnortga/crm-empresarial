import { supabase } from './supabase';
import { User } from '@/types';

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  
  // Obtener datos adicionales del usuario
  if (data.user) {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', data.user.id)
      .single();
    
    if (userError) throw userError;
    return userData as User;
  }
  
  return null;
}

export async function signUp(email: string, password: string, userData: Partial<User>) {
  // Primero crear el usuario en Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (authError) throw authError;
  
  if (authData.user) {
    // Luego crear el registro en la tabla users
    const { data, error } = await supabase
      .from('users')
      .insert([{
        auth_id: authData.user.id,
        email: email,
        name: userData.name,
        role: userData.role || 'viewer',
      }])
      .select();
    
    if (error) throw error;
    return data[0] as User;
  }
  
  return null;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('auth_id', session.user.id)
    .single();
  
  if (error) throw error;
  return data as User;
}

export async function getUserCompanies(userId: string) {
  const { data, error } = await supabase
    .from('user_companies')
    .select(`
      company_id,
      is_primary,
      companies (*)
    `)
    .eq('user_id', userId);
  
  if (error) throw error;
  return data;
}
