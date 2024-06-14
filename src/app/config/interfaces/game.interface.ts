import { Player } from "./player.interface"

export interface Game {
  id: string,
  name: string,
  players: Player[],
  admins: Player[]
}

export interface Score {
  point: string | number,
  selectedCard: boolean,
  hostSelectCard: boolean
}

export interface SelectCard {
  point: number | string,
  count: number
}

export interface StateGame {
  players: Player[],
  scores: Score[],
  selectedCards: SelectCard[],
  average: number,
  isSelectCards: boolean,
  isRevealPoints: boolean,
  isCardsBlocked: boolean,
  isAverageSelected: boolean,
  isEndVotes: boolean
}

export interface StateGameFlags {
  isRevealPoints: boolean,
  isAverageSelected: boolean,
  isSelectCards: boolean,
  isEndVotes: boolean
}

export interface cardVote {
  average: number,
  votes: SelectCard[]
}
