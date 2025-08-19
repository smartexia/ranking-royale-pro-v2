import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  Minus, 
  Trophy, 
  Users, 
  Calendar, 
  Settings,
  Target,
  Clock,
  MapPin,
  Zap
} from 'lucide-react';

interface ScoringRule {
  id: string;
  position: number;
  points: number;
  description: string;
}

interface TournamentForm {
  name: string;
  description: string;
  type: 'short' | 'long';
  duration: number;
  maxTeams: number;
  groupCount: number;
  teamsPerGroup: number;
  registrationDeadline: string;
  startDate: string;
  endDate: string;
  gameMode: string;
  mapRotation: string[];
  entryFee: number;
  prizePool: number;
  isPublic: boolean;
  allowSpectators: boolean;
  scoringRules: ScoringRule[];
}

const CreateTournament = () => {
  const [form, setForm] = useState<TournamentForm>({
    name: '',
    description: '',
    type: 'short',
    duration: 1,
    maxTeams: 25,
    groupCount: 1,
    teamsPerGroup: 25,
    registrationDeadline: '',
    startDate: '',
    endDate: '',
    gameMode: 'battle-royale',
    mapRotation: ['Blackout'],
    entryFee: 0,
    prizePool: 0,
    isPublic: true,
    allowSpectators: true,
    scoringRules: [
      { id: '1', position: 1, points: 15, description: 'Vitória Royale' },
      { id: '2', position: 2, points: 12, description: '2º Lugar' },
      { id: '3', position: 3, points: 10, description: '3º Lugar' },
      { id: '4', position: 4, points: 8, description: '4º Lugar' },
      { id: '5', position: 5, points: 6, description: '5º Lugar' }
    ]
  });

  const [newMap, setNewMap] = useState('');
  const [newScoringRule, setNewScoringRule] = useState({ position: 6, points: 4, description: '' });

  const handleInputChange = (field: keyof TournamentForm, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
    
    // Auto-calculate teams per group
    if (field === 'maxTeams' || field === 'groupCount') {
      const maxTeams = field === 'maxTeams' ? value : form.maxTeams;
      const groupCount = field === 'groupCount' ? value : form.groupCount;
      const teamsPerGroup = Math.ceil(maxTeams / groupCount);
      setForm(prev => ({ ...prev, teamsPerGroup }));
    }
  };

  const addMap = () => {
    if (newMap.trim()) {
      setForm(prev => ({
        ...prev,
        mapRotation: [...prev.mapRotation, newMap.trim()]
      }));
      setNewMap('');
    }
  };

  const removeMap = (index: number) => {
    setForm(prev => ({
      ...prev,
      mapRotation: prev.mapRotation.filter((_, i) => i !== index)
    }));
  };

  const addScoringRule = () => {
    if (newScoringRule.description.trim()) {
      const newRule: ScoringRule = {
        id: Date.now().toString(),
        position: newScoringRule.position,
        points: newScoringRule.points,
        description: newScoringRule.description
      };
      
      setForm(prev => ({
        ...prev,
        scoringRules: [...prev.scoringRules, newRule].sort((a, b) => a.position - b.position)
      }));
      
      setNewScoringRule({ 
        position: Math.max(...form.scoringRules.map(r => r.position)) + 1, 
        points: 2, 
        description: '' 
      });
    }
  };

  const removeScoringRule = (id: string) => {
    setForm(prev => ({
      ...prev,
      scoringRules: prev.scoringRules.filter(rule => rule.id !== id)
    }));
  };

  const updateScoringRule = (id: string, field: keyof ScoringRule, value: any) => {
    setForm(prev => ({
      ...prev,
      scoringRules: prev.scoringRules.map(rule => 
        rule.id === id ? { ...rule, [field]: value } : rule
      ).sort((a, b) => a.position - b.position)
    }));
  };

  const handleSubmit = () => {
    console.log('Criando campeonato:', form);
    // TODO: Implementar criação do campeonato
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
          <Plus className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Criar Campeonato
          </h1>
          <p className="text-gray-400 mt-2">Configure todos os detalhes do seu novo campeonato</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Informações Básicas
              </CardTitle>
              <CardDescription className="text-gray-400">
                Defina o nome, descrição e tipo do campeonato
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">Nome do Campeonato</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Ex: Elite Series #6"
                    className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-gray-300">Tipo de Campeonato</Label>
                  <Select value={form.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="short" className="text-white">Curto (1 dia)</SelectItem>
                      <SelectItem value="long" className="text-white">Longo (múltiplos dias)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300">Descrição</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Descreva o campeonato, regras especiais, premiação..."
                  className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Teams & Groups Configuration */}
          <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Configuração de Equipes
              </CardTitle>
              <CardDescription className="text-gray-400">
                Defina quantas equipes e grupos terá o campeonato
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxTeams" className="text-gray-300">Máximo de Equipes</Label>
                  <Input
                    id="maxTeams"
                    type="number"
                    value={form.maxTeams}
                    onChange={(e) => handleInputChange('maxTeams', parseInt(e.target.value) || 0)}
                    className="bg-gray-800/50 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="groupCount" className="text-gray-300">Número de Grupos</Label>
                  <Input
                    id="groupCount"
                    type="number"
                    value={form.groupCount}
                    onChange={(e) => handleInputChange('groupCount', parseInt(e.target.value) || 1)}
                    className="bg-gray-800/50 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teamsPerGroup" className="text-gray-300">Equipes por Grupo</Label>
                  <Input
                    id="teamsPerGroup"
                    type="number"
                    value={form.teamsPerGroup}
                    disabled
                    className="bg-gray-700/50 border-gray-600 text-gray-400"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dates & Schedule */}
          <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                Cronograma
              </CardTitle>
              <CardDescription className="text-gray-400">
                Configure as datas importantes do campeonato
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="registrationDeadline" className="text-gray-300">Prazo de Inscrição</Label>
                  <Input
                    id="registrationDeadline"
                    type="datetime-local"
                    value={form.registrationDeadline}
                    onChange={(e) => handleInputChange('registrationDeadline', e.target.value)}
                    className="bg-gray-800/50 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-gray-300">Data de Início</Label>
                  <Input
                    id="startDate"
                    type="datetime-local"
                    value={form.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="bg-gray-800/50 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-gray-300">Data de Término</Label>
                  <Input
                    id="endDate"
                    type="datetime-local"
                    value={form.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    className="bg-gray-800/50 border-gray-600 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Game Configuration */}
          <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-400" />
                Configuração do Jogo
              </CardTitle>
              <CardDescription className="text-gray-400">
                Defina modo de jogo e rotação de mapas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gameMode" className="text-gray-300">Modo de Jogo</Label>
                <Select value={form.gameMode} onValueChange={(value) => handleInputChange('gameMode', value)}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="battle-royale" className="text-white">Battle Royale</SelectItem>
                    <SelectItem value="multiplayer" className="text-white">Multiplayer</SelectItem>
                    <SelectItem value="ranked" className="text-white">Ranked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-gray-300">Rotação de Mapas</Label>
                <div className="flex gap-2">
                  <Input
                    value={newMap}
                    onChange={(e) => setNewMap(e.target.value)}
                    placeholder="Nome do mapa"
                    className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
                    onKeyPress={(e) => e.key === 'Enter' && addMap()}
                  />
                  <Button onClick={addMap} size="sm" className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.mapRotation.map((map, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-blue-500/20 text-blue-400 border-blue-500/30 flex items-center gap-1"
                    >
                      {map}
                      <button onClick={() => removeMap(index)} className="ml-1 hover:text-red-400">
                        <Minus className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Scoring System */}
          <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-red-400" />
                Sistema de Pontuação
              </CardTitle>
              <CardDescription className="text-gray-400">
                Configure os pontos por posição
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {form.scoringRules.map((rule) => (
                  <div key={rule.id} className="flex items-center gap-2 p-2 bg-gray-800/30 rounded">
                    <Input
                      type="number"
                      value={rule.position}
                      onChange={(e) => updateScoringRule(rule.id, 'position', parseInt(e.target.value) || 1)}
                      className="w-16 bg-gray-700/50 border-gray-600 text-white text-sm"
                    />
                    <span className="text-gray-400 text-sm">º</span>
                    <Input
                      type="number"
                      value={rule.points}
                      onChange={(e) => updateScoringRule(rule.id, 'points', parseInt(e.target.value) || 0)}
                      className="w-16 bg-gray-700/50 border-gray-600 text-white text-sm"
                    />
                    <span className="text-gray-400 text-sm">pts</span>
                    <button 
                      onClick={() => removeScoringRule(rule.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              
              <Separator className="bg-gray-700" />
              
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={newScoringRule.position}
                    onChange={(e) => setNewScoringRule(prev => ({ ...prev, position: parseInt(e.target.value) || 1 }))}
                    placeholder="Pos"
                    className="w-16 bg-gray-800/50 border-gray-600 text-white text-sm"
                  />
                  <Input
                    type="number"
                    value={newScoringRule.points}
                    onChange={(e) => setNewScoringRule(prev => ({ ...prev, points: parseInt(e.target.value) || 0 }))}
                    placeholder="Pts"
                    className="w-16 bg-gray-800/50 border-gray-600 text-white text-sm"
                  />
                  <Button onClick={addScoringRule} size="sm" className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <Input
                  value={newScoringRule.description}
                  onChange={(e) => setNewScoringRule(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrição (opcional)"
                  className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 text-sm"
                />
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-400" />
                Configurações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="isPublic" className="text-gray-300">Campeonato Público</Label>
                <Switch
                  id="isPublic"
                  checked={form.isPublic}
                  onCheckedChange={(checked) => handleInputChange('isPublic', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="allowSpectators" className="text-gray-300">Permitir Espectadores</Label>
                <Switch
                  id="allowSpectators"
                  checked={form.allowSpectators}
                  onCheckedChange={(checked) => handleInputChange('allowSpectators', checked)}
                />
              </div>
              
              <Separator className="bg-gray-700" />
              
              <div className="space-y-2">
                <Label htmlFor="entryFee" className="text-gray-300">Taxa de Inscrição (R$)</Label>
                <Input
                  id="entryFee"
                  type="number"
                  value={form.entryFee}
                  onChange={(e) => handleInputChange('entryFee', parseFloat(e.target.value) || 0)}
                  className="bg-gray-800/50 border-gray-600 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="prizePool" className="text-gray-300">Premiação Total (R$)</Label>
                <Input
                  id="prizePool"
                  type="number"
                  value={form.prizePool}
                  onChange={(e) => handleInputChange('prizePool', parseFloat(e.target.value) || 0)}
                  className="bg-gray-800/50 border-gray-600 text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-3"
            >
              <Zap className="w-4 h-4 mr-2" />
              Criar Campeonato
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800/50"
            >
              Salvar como Rascunho
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTournament;