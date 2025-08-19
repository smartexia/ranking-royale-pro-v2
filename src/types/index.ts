// Tipos compartilhados da aplicação

/**
 * Interface para dados de ranking de equipes
 */
export interface RankingData {
  position: number;
  team_name: string;
  team_tag: string;
  total_points: number;
  total_kills: number;
  matches_played: number;
  avg_position: number;
  championship_name: string;
  championship_id: string;
}

/**
 * Interface para dados de campeonatos
 */
export interface Championship {
  id: string;
  name: string;
  description?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
  organizer_id?: string;
}

/**
 * Interface para estatísticas de equipe processadas
 */
export interface TeamStats {
  team_name: string;
  team_tag: string;
  championship_name: string;
  championship_id: string;
  total_points: number;
  total_kills: number;
  matches_played: number;
  positions: number[];
}

/**
 * Interface para dados de equipe
 */
export interface Team {
  id: string;
  name: string;
  tag: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Interface para dados de torneio/partida
 */
export interface Match {
  id: string;
  championship_id: string;
  date: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Interface para resultados de partidas
 */
export interface MatchResult {
  id: string;
  match_id: string;
  team_id: string;
  position: number;
  points: number;
  kills: number;
  created_at?: string;
  updated_at?: string;
}