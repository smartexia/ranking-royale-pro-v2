import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import CreateTournament from '../components/admin/CreateTournament';
import ViewTournament from '../components/admin/ViewTournament';
import UploadResults from '../components/admin/UploadResults';
import FinalRanking from '../components/admin/FinalRanking';
import { 
  Trophy, 
  Users, 
  Calendar, 
  Target, 
  Upload, 
  Eye,
  Plus,
  Home,
  LogOut,
  BarChart3,
  Settings,
  Menu,
  Award
} from 'lucide-react';

type AdminSection = 'dashboard' | 'create-tournament' | 'view-tournament' | 'upload-results' | 'final-ranking';

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Redirect to auth if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleSignOut = async () => {
    await signOut();
  };

  const stats = {
    activeTournaments: 3,
    totalTeams: 75,
    todayMatches: 4,
    totalKills: 1247
  };

  const recentTournaments = [
    {
      id: 1,
      name: 'Elite Series #5',
      type: 'Longo (3 dias)',
      groups: 3,
      teams: '75/75',
      status: 'ATIVO' as const
    },
    {
      id: 2,
      name: 'Quick Battle Friday',
      type: 'Curto (1 dia)',
      groups: 1,
      teams: '22/25',
      status: 'INSCRIÇÕES' as const
    },
    {
      id: 3,
      name: 'Pro League Finals',
      type: 'Longo (5 dias)',
      groups: 2,
      teams: '50/50',
      status: 'FINALIZADO' as const
    }
  ];

  const renderDashboard = () => (
    <div className="space-y-8 p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
            Dashboard Administrativo
          </h1>
          <p className="text-gray-400 mt-2 text-sm lg:text-base">Gerencie seus campeonatos e acompanhe estatísticas em tempo real</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            onClick={() => setActiveSection('create-tournament')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Campeonato
          </Button>
          <Button 
            onClick={handleSignOut}
            variant="outline" 
            className="border-red-500/20 text-red-400 hover:bg-red-500/10 w-full sm:w-auto"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900/30 border-gray-700/30 backdrop-blur-xl hover:bg-gray-800/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-blue-400 tracking-wider">Campeonatos Ativos</CardTitle>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:rotate-12">
              <Trophy className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">{stats.activeTournaments}</div>
            <p className="text-xs text-blue-300 mt-1 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              +2 este mês
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/30 border-gray-700/30 backdrop-blur-xl hover:bg-gray-800/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-teal-600" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-green-400 tracking-wider">Total de Equipes</CardTitle>
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 transition-all duration-300 group-hover:rotate-12">
              <Users className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">{stats.totalTeams}</div>
            <p className="text-xs text-green-300 mt-1 flex items-center">
              <Users className="w-3 h-3 mr-1 animate-pulse" />
              25 por grupo
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/30 border-gray-700/30 backdrop-blur-xl hover:bg-gray-800/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-600" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-purple-400 tracking-wider">Partidas Hoje</CardTitle>
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:rotate-12">
              <Calendar className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">{stats.todayMatches}</div>
            <p className="text-xs text-purple-300 mt-1 flex items-center">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-ping"></span>
              Próxima em 2h
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/30 border-gray-700/30 backdrop-blur-xl hover:bg-gray-800/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20 group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-600" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-red-400 tracking-wider">Total de Kills</CardTitle>
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:shadow-red-500/50 transition-all duration-300 group-hover:rotate-12">
              <Target className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">{stats.totalKills}</div>
            <p className="text-xs text-red-300 mt-1 flex items-center">
              <Target className="w-3 h-3 mr-1 animate-ping" />
              Média: 16 kills/jogo
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tournaments Table */}
      <Card className="bg-gray-900/30 border-gray-700/30 backdrop-blur-xl hover:bg-gray-800/40 transition-all duration-300 group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-orange-600" />
        <CardHeader className="relative z-10">
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-yellow-500/30 animate-pulse">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Campeonatos Recentes
            </span>
          </CardTitle>
          <CardDescription className="text-gray-400">
            Gerencie e acompanhe o status dos seus campeonatos
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="text-left py-4 px-2 lg:px-4 text-gray-400 font-semibold tracking-wider text-xs lg:text-sm">CAMPEONATO</th>
                  <th className="text-left py-4 px-2 lg:px-4 text-gray-400 font-semibold tracking-wider text-xs lg:text-sm hidden md:table-cell">TIPO</th>
                  <th className="text-center py-4 px-2 lg:px-4 text-gray-400 font-semibold tracking-wider text-xs lg:text-sm">GRUPOS</th>
                  <th className="text-center py-4 px-2 lg:px-4 text-gray-400 font-semibold tracking-wider text-xs lg:text-sm">EQUIPES</th>
                  <th className="text-center py-4 px-2 lg:px-4 text-gray-400 font-semibold tracking-wider text-xs lg:text-sm">STATUS</th>
                  <th className="text-center py-4 px-2 lg:px-4 text-gray-400 font-semibold tracking-wider text-xs lg:text-sm">AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {recentTournaments.map((tournament, index) => (
                  <tr 
                    key={tournament.id} 
                    className="border-b border-gray-800/50 hover:bg-gradient-to-r hover:from-gray-800/30 hover:via-gray-700/20 hover:to-transparent transition-all duration-300 group/row"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <td className="py-4 px-2 lg:px-4">
                      <div className="flex items-center gap-2 lg:gap-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse" />
                        <div>
                          <h3 className="font-bold text-white group-hover/row:text-blue-400 transition-colors duration-300 text-sm lg:text-base">{tournament.name}</h3>
                          <p className="text-xs lg:text-sm text-gray-400 md:hidden">{tournament.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 lg:px-4 hidden md:table-cell">
                      <span className="text-gray-300 font-medium text-sm lg:text-base">{tournament.type}</span>
                    </td>
                    <td className="text-center py-4 px-2 lg:px-4">
                      <div className="flex items-center justify-center gap-1">
                        <div className="w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-white">{tournament.groups}</span>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-4 px-2 lg:px-4">
                      <div className="flex items-center justify-center gap-1">
                        <Users className="w-3 h-3 lg:w-4 lg:h-4 text-green-400" />
                        <span className="font-bold text-green-400 text-sm lg:text-base">{tournament.teams}</span>
                      </div>
                    </td>
                    <td className="text-center py-4 px-2 lg:px-4">
                      <Badge 
                        variant={tournament.status === 'ATIVO' ? 'default' : tournament.status === 'INSCRIÇÕES' ? 'secondary' : 'outline'}
                        className={`
                          font-semibold backdrop-blur-sm border transition-all duration-300 hover:scale-105
                          ${tournament.status === 'ATIVO' 
                            ? 'bg-green-500/20 text-green-400 border-green-500/30 shadow-lg shadow-green-500/20' 
                            : tournament.status === 'INSCRIÇÕES' 
                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/30 shadow-lg shadow-blue-500/20'
                            : 'bg-red-500/20 text-red-400 border-red-500/30 shadow-lg shadow-red-500/20'
                          }
                        `}
                      >
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full animate-pulse ${
                            tournament.status === 'ATIVO' ? 'bg-green-400' :
                            tournament.status === 'INSCRIÇÕES' ? 'bg-blue-400' : 'bg-red-400'
                          }`} />
                          {tournament.status}
                        </div>
                      </Badge>
                    </td>
                    <td className="text-center py-4 px-2 lg:px-4">
                      <div className="flex flex-col lg:flex-row justify-center gap-1 lg:gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 backdrop-blur-sm text-xs lg:text-sm px-2 lg:px-3"
                          onClick={() => setActiveSection('view-tournament')}
                        >
                          <Eye className="w-3 h-3 lg:mr-1" />
                          <span className="hidden lg:inline">GERENCIAR</span>
                        </Button>
                        {tournament.status === 'FINALIZADO' && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25 backdrop-blur-sm text-xs lg:text-sm px-2 lg:px-3"
                            onClick={() => setActiveSection('final-ranking')}
                          >
                            <Trophy className="w-3 h-3 lg:mr-1" />
                            <span className="hidden lg:inline">RESULTADOS</span>
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'create-tournament':
        return (
          <div className="space-y-6">
            <CreateTournament />
          </div>
        );
      case 'view-tournament':
        return (
          <div className="space-y-6">
            <ViewTournament />
          </div>
        );
      case 'upload-results':
        return (
          <div className="space-y-6">
            <UploadResults />
          </div>
        );
      case 'final-ranking':
        return (
          <div className="space-y-6">
            <FinalRanking />
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950/20 to-purple-950/20 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(34,197,94,0.05),transparent_50%)] pointer-events-none" />
      
      {/* Animated Grid */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-64 bg-gray-900/80 backdrop-blur-xl border-r border-gray-700/50 z-50 shadow-2xl shadow-blue-500/10
        transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30 animate-pulse">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">COD MOBILE</h2>
              <p className="text-xs text-gray-400">CHAMPIONSHIPS</p>
            </div>
          </div>

          <nav className="space-y-2">
            <Button
              variant={activeSection === 'dashboard' ? 'default' : 'ghost'}
              className={`w-full justify-start relative overflow-hidden group transition-all duration-300 ${
                activeSection === 'dashboard' 
                  ? 'bg-gradient-to-r from-blue-600/80 via-purple-600/80 to-pink-600/80 text-white shadow-lg shadow-blue-500/25 backdrop-blur-sm border border-blue-400/30' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50 hover:backdrop-blur-sm hover:border hover:border-gray-600/30'
              }`}
              onClick={() => setActiveSection('dashboard')}
            >
              {activeSection === 'dashboard' && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
              )}
              <BarChart3 className={`w-4 h-4 mr-3 relative z-10 transition-all duration-300 ${
                activeSection === 'dashboard' ? 'text-white drop-shadow-lg' : 'group-hover:text-blue-400'
              }`} />
              <span className="relative z-10">Dashboard</span>
              {activeSection === 'dashboard' && (
                <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-ping" />
              )}
            </Button>

            <Button
              variant={activeSection === 'create-tournament' ? 'default' : 'ghost'}
              className={`w-full justify-start relative overflow-hidden group transition-all duration-300 ${
                activeSection === 'create-tournament' 
                  ? 'bg-gradient-to-r from-blue-600/80 via-purple-600/80 to-pink-600/80 text-white shadow-lg shadow-blue-500/25 backdrop-blur-sm border border-blue-400/30' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50 hover:backdrop-blur-sm hover:border hover:border-gray-600/30'
              }`}
              onClick={() => setActiveSection('create-tournament')}
            >
              {activeSection === 'create-tournament' && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
              )}
              <Plus className={`w-4 h-4 mr-3 relative z-10 transition-all duration-300 ${
                activeSection === 'create-tournament' ? 'text-white drop-shadow-lg' : 'group-hover:text-blue-400'
              }`} />
              <span className="relative z-10">Criar Campeonato</span>
              {activeSection === 'create-tournament' && (
                <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-ping" />
              )}
            </Button>

            <Button
              variant={activeSection === 'view-tournament' ? 'default' : 'ghost'}
              className={`w-full justify-start relative overflow-hidden group transition-all duration-300 ${
                activeSection === 'view-tournament' 
                  ? 'bg-gradient-to-r from-blue-600/80 via-purple-600/80 to-pink-600/80 text-white shadow-lg shadow-blue-500/25 backdrop-blur-sm border border-blue-400/30' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50 hover:backdrop-blur-sm hover:border hover:border-gray-600/30'
              }`}
              onClick={() => setActiveSection('view-tournament')}
            >
              {activeSection === 'view-tournament' && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
              )}
              <Eye className={`w-4 h-4 mr-3 relative z-10 transition-all duration-300 ${
                activeSection === 'view-tournament' ? 'text-white drop-shadow-lg' : 'group-hover:text-blue-400'
              }`} />
              <span className="relative z-10">Campeonato Ativo</span>
              {activeSection === 'view-tournament' && (
                <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-ping" />
              )}
            </Button>

            <Button
              variant={activeSection === 'upload-results' ? 'default' : 'ghost'}
              className={`w-full justify-start relative overflow-hidden group transition-all duration-300 ${
                activeSection === 'upload-results' 
                  ? 'bg-gradient-to-r from-blue-600/80 via-purple-600/80 to-pink-600/80 text-white shadow-lg shadow-blue-500/25 backdrop-blur-sm border border-blue-400/30' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50 hover:backdrop-blur-sm hover:border hover:border-gray-600/30'
              }`}
              onClick={() => setActiveSection('upload-results')}
            >
              {activeSection === 'upload-results' && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
              )}
              <Upload className={`w-4 h-4 mr-3 relative z-10 transition-all duration-300 ${
                activeSection === 'upload-results' ? 'text-white drop-shadow-lg' : 'group-hover:text-blue-400'
              }`} />
              <span className="relative z-10">Upload Resultados</span>
              {activeSection === 'upload-results' && (
                <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-ping" />
              )}
            </Button>

            <Button
              variant={activeSection === 'final-ranking' ? 'default' : 'ghost'}
              className={`w-full justify-start relative overflow-hidden group transition-all duration-300 ${
                activeSection === 'final-ranking' 
                  ? 'bg-gradient-to-r from-blue-600/80 via-purple-600/80 to-pink-600/80 text-white shadow-lg shadow-blue-500/25 backdrop-blur-sm border border-blue-400/30' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50 hover:backdrop-blur-sm hover:border hover:border-gray-600/30'
              }`}
              onClick={() => setActiveSection('final-ranking')}
            >
              {activeSection === 'final-ranking' && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
              )}
              <Award className={`w-4 h-4 mr-3 relative z-10 transition-all duration-300 ${
                activeSection === 'final-ranking' ? 'text-white drop-shadow-lg' : 'group-hover:text-blue-400'
              }`} />
              <span className="relative z-10">Classificação Final</span>
              {activeSection === 'final-ranking' && (
                <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-ping" />
              )}
            </Button>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden bg-gray-900/90 backdrop-blur-xl border-b border-gray-700/50 p-4 relative z-50">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            COD MOBILE CHAMPIONSHIPS
          </h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
          >
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 p-4 lg:p-8 relative z-0">
        <div className="relative">
          {/* Content Background */}
          <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm rounded-2xl border border-gray-700/30 shadow-2xl shadow-black/20 -z-10" />
          
          <div className="relative z-10">
            {renderContent()}
          </div>
        </div>
      </div>
      
      {/* Custom Styles */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        
        .animate-glow {
          animation: glow-pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;