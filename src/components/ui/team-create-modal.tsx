import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Users, Trophy, Tag } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface TeamCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTeamCreated?: () => void;
}

const TeamCreateModal: React.FC<TeamCreateModalProps> = ({ isOpen, onClose, onTeamCreated }) => {
  
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    tag: '',
    players: ['', '', '', '', ''] // 5 jogadores
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePlayerChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      players: prev.players.map((player, i) => i === index ? value : player)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Erro de Autenticação",
        description: "Você precisa estar logado para criar um time.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.name.trim()) {
      toast({
        title: "Nome Obrigatório",
        description: "Por favor, insira um nome para o time.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.tag.trim()) {
      toast({
        title: "Tag Obrigatória",
        description: "Por favor, insira uma tag para o time.",
        variant: "destructive"
      });
      return;
    }

    const activePlayers = formData.players.filter(player => player.trim() !== '');
    if (activePlayers.length < 3) {
      toast({
        title: "Insufficient Players",
        description: "Team must have at least 3 players.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Buscar o perfil do usuário atual
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (profileError || !profile) {
        throw new Error('User profile not found');
      }

      // Criar o time
      const { data: team, error: teamError } = await supabase
        .from('teams')
        .insert({
          name: formData.name.trim(),
          tag: formData.tag.trim().toUpperCase(),
          captain_id: profile.id,
          players: activePlayers
        })
        .select()
        .single();

      if (teamError) {
        throw teamError;
      }

      toast({
        title: "🎉 Time criado com sucesso!",
        variant: "default"
      });

      // Reset form
      setFormData({
        name: '',
        tag: '',
        players: ['', '', '', '', '']
      });

      onClose();
      if (onTeamCreated) {
        onTeamCreated();
      }

    } catch (error: any) {
      console.error('Erro ao criar time:', error);
      toast({
        title: "Erro ao Criar Time",
        description: error.message || 'Ocorreu um erro inesperado.',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        name: '',
        tag: '',
        players: ['', '', '', '', '']
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-gaming text-2xl text-gaming-primary flex items-center gap-2">
            <Users className="w-6 h-6" />
            Criar Novo Time
          </DialogTitle>
          <DialogDescription className="font-gaming-body">
            Crie seu time e convide jogadores para participar de torneios épicos!
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="team-name" className="font-gaming-body flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Nome do Time *
              </Label>
              <Input
                id="team-name"
                placeholder="Ex: Legends Squad"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="font-gaming-body"
                maxLength={50}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="team-tag" className="font-gaming-body flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Tag do Time *
              </Label>
              <Input
                id="team-tag"
                placeholder="Ex: LGDS"
                value={formData.tag}
                onChange={(e) => handleInputChange('tag', e.target.value.toUpperCase())}
                className="font-gaming-body uppercase"
                maxLength={6}
                disabled={loading}
              />
            </div>
          </div>



          {/* Jogadores */}
          <div className="space-y-4">
            <Label className="font-gaming-body flex items-center gap-2">
              <Users className="w-4 h-4" />
              Jogadores (mínimo 3, máximo 5) *
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {formData.players.map((player, index) => (
                <div key={index} className="space-y-1">
                  <Label htmlFor={`player-${index}`} className="text-xs font-gaming-body text-muted-foreground">
                    Jogador {index + 1} {index < 3 ? '*' : ''}
                  </Label>
                  <Input
                    id={`player-${index}`}
                    placeholder={`Nome do jogador ${index + 1}`}
                    value={player}
                    onChange={(e) => handlePlayerChange(index, e.target.value)}
                    className="font-gaming-body"
                    maxLength={30}
                    disabled={loading}
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground font-gaming-body">
              * Campos obrigatórios. Como administrador/manager, você não precisa estar na lista de jogadores.
            </p>
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="gaming"
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Criando...' : 'Criar Time'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TeamCreateModal;