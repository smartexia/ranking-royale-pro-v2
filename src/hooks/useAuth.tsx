import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, username?: string) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, username?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    console.log('🔍 [DEBUG] Iniciando signUp com:', { email, username, redirectUrl });
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          username: username,
          full_name: username
        }
      }
    });
    
    console.log('🔍 [DEBUG] Resultado do signUp:', { data, error });
    
    if (error) {
      console.error('❌ [ERROR] SignUp error:', error);
      return { error };
    }
    
    if (data.user) {
      console.log('✅ [SUCCESS] Usuário criado:', data.user.id);
      
      // Verificar se o perfil foi criado automaticamente pelo trigger
      try {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', data.user.id)
          .single();
          
        console.log('🔍 [DEBUG] Verificação do perfil:', { profile, profileError });
        
        if (profileError && profileError.code === 'PGRST116') {
          console.log('⚠️ [WARNING] Perfil não encontrado, criando manualmente...');
          
          // Criar perfil manualmente se o trigger falhou
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              user_id: data.user.id,
              username: username,
              full_name: username
            })
            .select()
            .single();
            
          console.log('🔍 [DEBUG] Criação manual do perfil:', { newProfile, createError });
          
          if (createError) {
            console.error('❌ [ERROR] Failed to create profile manually:', createError);
          } else {
            console.log('✅ [SUCCESS] Perfil criado manualmente:', newProfile);
          }
        } else if (profile) {
          console.log('✅ [SUCCESS] Perfil encontrado (trigger funcionou):', profile);
        }
      } catch (profileCheckError) {
        console.error('❌ [ERROR] Error checking profile:', profileCheckError);
      }
    }
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};