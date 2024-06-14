import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { Player } from '../../config/interfaces/player.interface';
import { SharedService } from '../../shared/services/shared/shared.service';
import { CreatePlayerService } from '../../services/create-player/create-player.service';
import { RoomService } from '../../services/room/room.service';
import { Game, Score, SelectCard, StateGame, StateGameFlags, cardVote } from '../../config/interfaces/game.interface';

@Component({
  selector: 'app-room-game',
  templateUrl: './room-game.component.html',
  styleUrl: './room-game.component.scss'
})
export class RoomGameComponent implements OnInit {
  public roomGameName: string | null = '';
  public roomId: string | null = '';
  public url: string = "";
  public playerSession: Player = {
    id: 0,
    idGame: '',
    initialLetter: '',
    name: '',
    gameMode: 'player',
    selectedCard: false,
    isHost: false,
    point: 0
  };
  public sections: any[][] = [];
  public currentSectionIndex: number = 0;
  public selectedScoreMode: 'normal' | 'fibonacci' = 'fibonacci';
  public scores: Score[] = [
    // { point: 0, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 1, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 2, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 3, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 5, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 8, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 13, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 21, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 34, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 55, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 89, selectedCard: false, hostSelectCard: false, count: 0 }, { point: '?', selectedCard: false, hostSelectCard: false, count: 0 }, { point: '☕', selectedCard: false, hostSelectCard: false, count: 0 }
  ];
  public selectedCards: SelectCard[] = [];
  public average: number = 0;
  public playerSelected: any;
  public messageInfo: string = '';
  public isShowPermissionModal: boolean = false;
  public isFormSubmitted: boolean = true;
  public isSelectCards: boolean = false;
  public isRevealPoints: boolean = false;
  public isCardsBlocked: boolean = false;
  public isAverageSelected: boolean = false;
  public isPlayerAdmin: boolean = false;
  public isEndVotes: boolean = false;
  public isViewer: boolean = false;
  public isOpenModal: boolean = false;
  public isOpenInviteModal: boolean = false;
  public isDropdownOpen: boolean = false;
  public isShowInfo: boolean = false;
  private adminsPlayers: Player[] = [];
  private unsuscriber$: Subject<void> = new Subject<void>();
  public players: Player[] = [];

  constructor(private route: ActivatedRoute, private sharedService: SharedService, private createPlayerService: CreatePlayerService, private roomService: RoomService) { }

  ngOnInit() {
    this.openUserModal();
    this.sharedService.getFormSubmitted.pipe(takeUntil(this.unsuscriber$)).subscribe((value) => this.isFormSubmitted = value);
    this.generateScores();
    this.roomName();
    this.receiveRoutingParameters();
    this.isViewer = this.checkHostIsModePlayer();
    this.checkOnRevealPoints();
    this.checkOnVotes();
    this.checkOnResetGame();
  }

  checkOnRevealPoints(): void {
    this.roomService.onRevealPoints().pipe(takeUntil(this.unsuscriber$)).subscribe(({ isRevealPoints, isAverageSelected, isSelectCards, isEndVotes }: StateGameFlags) => {
      if(isRevealPoints || isAverageSelected || isSelectCards || isEndVotes) {
        this.isRevealPoints = isRevealPoints;
        this.isAverageSelected = isAverageSelected;
        this.isSelectCards = isSelectCards;
        this.isEndVotes = isEndVotes;
      }
    });
  }

  checkOnVotes(): void {
    this.roomService.onCardVotes().pipe(takeUntil(this.unsuscriber$)).subscribe((cardsVotes: cardVote) => {
      if(cardsVotes) {
        this.selectedCards = cardsVotes.votes;
        this.average = cardsVotes.average;
      }
    })
  }

  openPermissionModal(player: Player): void {
    const isAdminPlayerSession = this.adminsPlayers.find(p => p.id === this.playerSession.id);
    const isAdmin = this.adminsPlayers.find(p => p.id === player.id);
    if(isAdminPlayerSession) {
      if(this.playerSession.id === player.id || isAdmin) {
        this.isShowInfo = true;
        this.messageInfo = this.playerSession.id === player.id ? 'Ya eres administrador' : 'Ya el jugador es administrador';
        setTimeout(() => {
          this.isShowInfo = false;
          this.messageInfo = '';
        }, 2000);
      } else {
        this.playerSelected = player;
        this.isShowPermissionModal = true;
      }
    } else {
      this.messageInfo = "No tienes permisos para realizar esta acción";
      this.isShowInfo = true;
      setTimeout(() => {
        this.isShowInfo = false;
        this.messageInfo = '';
      }, 2000);
    }
    this.addPlayerInAdmins();
  }

  addPlayerInAdmins(): void {
    this.roomService.onUpdateAdmins().pipe(takeUntil(this.unsuscriber$)).subscribe((admins: Player[]) => {
      this.adminsPlayers = admins;
      this.isShowPermissionModal = false;
      this.isShowInfo = true;
      this.messageInfo = 'El jugador seleccionado ahora es administrador';
      setTimeout(() => {
        this.isShowInfo = false;
        this.messageInfo = '';
      }, 2000);
    });
  }

  closePermissionModal(event: any): void {
    this.isShowPermissionModal = event;
  }

  checkOnResetGame(): void {
    this.roomService.onResetGame().pipe(takeUntil(this.unsuscriber$)).subscribe(({ players, scores, selectedCards, average, isSelectCards, isRevealPoints, isCardsBlocked, isAverageSelected, isEndVotes }: StateGame) => {
      if(players || scores || selectedCards || average || isSelectCards || isRevealPoints || isCardsBlocked || isAverageSelected || isEndVotes) {
        this.players = players;
        this.scores = scores;
        this.selectedCards = selectedCards;
        this.average = average;
        this.isSelectCards = isSelectCards;
        this.isRevealPoints = isRevealPoints;
        this.isCardsBlocked = isCardsBlocked;
        this.isAverageSelected = isAverageSelected;
        this.isEndVotes = isEndVotes;
        this.players.forEach((player) => {
          if(player.id === this.playerSession.id) {
            this.playerSession = player;
          }
          this.updatePlayerInSection(player);
        });
      }
    });
  }

  private roomName(): void {
    this.roomService.onNewPlayer().pipe(takeUntil(this.unsuscriber$)).subscribe(({ name, admins }: Game) => {
      if(!name || !admins) return;
      this.roomGameName = name;
      this.adminsPlayers = admins;
    });
  }

  ngOnDestroy() {
    this.unsuscriber$.next();
    this.unsuscriber$.complete();
  }

  private receiveRoutingParameters(): void {
    this.route.paramMap.pipe(takeUntil(this.unsuscriber$)).subscribe((params) => {
      const id: string | null = params.get('id');
      this.sharedService.setGameId(id);
      this.roomId = id;
    });
  }

  openUserModal(): void {
    this.isOpenModal = true;
  }

  private dividePlayersIntoSections(): void {
    this.sections = Array.from({ length: 5 }, () => []);
    if (this.players) {
      this.players.forEach((player) => {
        if (this.isCurrentPlayer(player)) {
          this.playerSession = player;
        } else {
          this.assignPlayerToSection(player);
        }
      });
    }
  }

  private isCurrentPlayer(player: Player): boolean {
    return this.playerSession.id === player.id;
  }

  private assignPlayerToSection(player: Player): void {
    const sectionIndex = this.currentSectionIndex;

    if (this.isOddOrZeroSection()) {
      this.sections[sectionIndex].push(player);
      this.updateCurrentSectionIndex();
    } else if (this.isEvenSectionAndNotInitial()) {
      if (this.areOddSectionsFilled()) {
        this.sections[sectionIndex].push(player);
        this.updateCurrentSectionIndex();
      } else {
        this.sections[sectionIndex - 1].push(player);
        this.updateCurrentSectionIndex();
      }
    } else {
      this.sections[0].push(player);
      this.updateCurrentSectionIndex();
    }
  }

  private isOddOrZeroSection(): boolean {
    return this.currentSectionIndex === 0 || this.sections[0].length % 2 !== 0;
  }

  private isEvenSectionAndNotInitial(): boolean {
    return this.sections[0].length % 2 === 0 && this.sections[0].length >= 3;
  }

  private areOddSectionsFilled(): boolean {
    return this.sections[1].length % 2 !== 0 && this.sections[3].length % 2 !== 0;
  }

  private updateCurrentSectionIndex(): void {
    this.currentSectionIndex = (this.currentSectionIndex + 1) % 5;
  }

  private generateScores(): void {
    if (this.selectedScoreMode === 'normal') {
      // Modo normal: puntajes del 0 al 10 con símbolos
      this.scores = Array.from({ length: 12 }, (_, index) => {
        if (index === 10) {
          return { point: `?`, selectedCard: false, hostSelectCard: false }; // Añadir el signo de interrogación y el símbolo de la taza de café al final
        } else if(index === 11) {
          return { point: `☕`, selectedCard: false, hostSelectCard: false };
        } else {
          return { point: index, selectedCard: false, hostSelectCard: false };
        }
      });
    } else if(this.selectedScoreMode === 'fibonacci') {
      // Modo Fibonacci: puntajes de la secuencia de Fibonacci hasta 10 con símbolos
      const fibonacciSequence = [ { point: 0, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 1, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 2, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 3, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 5, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 8, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 13, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 21, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 34, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 55, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 89, selectedCard: false, hostSelectCard: false, count: 0 }, { point: '?', selectedCard: false, hostSelectCard: false, count: 0 }, { point: '☕', selectedCard: false, hostSelectCard: false, count: 0 } ];
      this.scores = fibonacciSequence
    }
  }

  checkAllPlayersSelected(players: Player[], adminsPlayers: Player[]): void {
    const allPlayersSelected = players.filter(player => player.gameMode === 'player').every(player => player.gameMode === 'player' && player.selectedCard);
    if(allPlayersSelected) {
      this.isSelectCards = true;
      const playersAdmins = adminsPlayers.find(p => p.id === this.playerSession.id);
      if(playersAdmins) {
        this.isPlayerAdmin = true;
      } else {
        this.isPlayerAdmin = false;
      }
    }
  }

  // onPointCardClick(selectedPoint: any): void {
  //   const selectedCard = this.scores.find(score => score.point === selectedPoint);
  //   if (this.isInvalidSelection(selectedCard, this.playerSession, selectedPoint)) {
  //     this.clearSelections(selectedCard, this.playerSession);
  //   } else if (this.canSelectCard(selectedCard, this.playerSession)) {
  //     this.selectCard(selectedCard, this.playerSession, selectedPoint);
  //     this.roomService.selectCard(this.playerSession);
  //     this.roomService.onSelectedCard().pipe(takeUntil(this.unsuscriber$)).subscribe((game: Game) => {
  //       this.players = game.players;
  //       this.adminsPlayers = game.admins;
  //       this.checkAllPlayersSelected(game.players, game.admins);
  //     });
  //   }
  // }

  onPointCardClick(selectedPoint: string | number): void {
    const selectedCard = this.scores.find(score => score.point === selectedPoint);
    if (!selectedCard) {
      return;
    }
    if (this.isInvalidSelection(selectedCard, this.playerSession, selectedPoint)) {
      this.clearSelections(selectedCard, this.playerSession);
      return;
    }
    if (this.canSelectCard(selectedCard, this.playerSession)) {
      this.selectCard(selectedCard, this.playerSession, selectedPoint);
      this.roomService.selectCard(this.playerSession);

      this.roomService.onSelectedCard()
        .pipe(takeUntil(this.unsuscriber$))
        .subscribe(game => {
          const { players, admins } = game;
          this.players = players;
          this.adminsPlayers = admins;
          this.checkAllPlayersSelected(players, admins);
        });
    }
  }

  private isInvalidSelection(selectedCard: any, hostPlayer: any, selectedPoint: any): boolean {
    return (
      selectedCard?.point === selectedPoint &&
      hostPlayer &&
      selectedCard.selectedCard &&
      !selectedCard.hostSelectedCard
    );
  }

  private clearSelections(selectedCard: any, hostPlayer: any): void {
    this.scores
      .filter(score => score.point === selectedCard.point)
      .forEach(score => {
        score.selectedCard = false;
        score.hostSelectCard = false;
      });
    hostPlayer.selectedCard = false;
    hostPlayer.point = 0;
    this.isSelectCards = false;
  }

  private canSelectCard(selectedCard: any, hostPlayer: any): boolean {
    return (
      hostPlayer &&
      !selectedCard.hostSelectedCard &&
      !selectedCard.selectedCard &&
      !this.isCardsBlocked
    );
  }

  private selectCard(selectedCard: any, hostPlayer: any, selectedPoint: any): void {
    hostPlayer.selectedCard = true;
    hostPlayer.point = selectedPoint;
    selectedCard.selectedCard = true;
    selectedCard.hostSelectCard = true;
  }

  onRevealClick(): void {
    this.isRevealPoints = true;
    this.isAverageSelected = true;
    this.isSelectCards = false;
    this.isEndVotes = true;
    this.roomService.revealPoints(this.isRevealPoints, this.isAverageSelected, this.isSelectCards, this.isEndVotes);
    this.collectVotes();
  }

  openModalInvitePlayer(): void {
    this.isOpenInviteModal = !this.isOpenInviteModal;
    this.url = `localhost:4200/room-game/${this.roomId}`;
  }

  private collectVotes(): void {
    const playerVotings = this.players.filter(player => player.gameMode === 'player');
    const votes: any[] = [];
    playerVotings.forEach(player => {
      votes.push(player.point);
    });
    votes.sort((a, b) => a - b);
    votes.forEach(vote => {
      const indexVote = this.selectedCards.findIndex(card => card.point === vote);
      if (indexVote !== -1) {
        this.selectedCards[indexVote].count += 1;
      } else {
        this.selectedCards.push({ point: vote, count: 1 });
      }
    });
    this.calculateAverageScore(this.selectedCards);
  }


  private calculateAverageScore(voteCards: any[]): void {
    let totalPoints: number = 0;
    let totalVotes: number = 0;
    voteCards.forEach(card => {
      if (!['?', '☕'].includes(card.point)) {
        totalPoints += card.point * card.count;
        totalVotes += card.count;
      }
    });
    this.average = totalVotes > 0 ? parseFloat((totalPoints / totalVotes).toFixed(2)) : 0;
    const cardVotes = {
      average: this.average,
      votes: voteCards
    }
    this.roomService.cardVotes(cardVotes);
  }

  resetVoting(): void {
    this.players.forEach(player => {
      player.selectedCard = false;
      player.point = 0;
    });
    this.scores.forEach(score => {
      score.selectedCard = false;
      score.hostSelectCard = false;
    })
    this.selectedCards = [];
    this.average = 0;
    this.isSelectCards = false;
    this.isRevealPoints = false;
    this.isCardsBlocked = false;
    this.isAverageSelected = false;
    this.isEndVotes = false;
    this.roomService.resetGame(this.players, this.scores, this.selectedCards, this.average, this.isSelectCards, this.isRevealPoints, this.isCardsBlocked, this.isAverageSelected, this.isEndVotes);
  }

  private checkHostIsModePlayer(): boolean {
    const playerHost = this.players.find(player => player.isHost);
    return playerHost && playerHost.gameMode ? true : false;
  }

  watchPlayerSession(): void {
    this.createPlayerService.playerSession.pipe(takeUntil(this.unsuscriber$)).subscribe((data: Player) => {
      if(data) this.playerSession = data;
    });
  }

  watchPlayers(): void {
    this.roomService.onNewPlayer().pipe(takeUntil(this.unsuscriber$)).subscribe(({ players, name, admins }: Game) => {
      this.players = players;
      this.roomGameName = name;
      this.adminsPlayers = admins;
    });
    this.dividePlayersIntoSections();
  }

  closeUserModal(): void {
    this.isOpenModal = false;
    this.createPlayerService.playerSession.pipe(takeUntil(this.unsuscriber$)).subscribe((data: Player) => {
      if(data) this.playerSession = data;
    });
    this.roomService.onUpdateRoom().pipe(takeUntil(this.unsuscriber$)).subscribe((players: Player[]) => {
      this.players = players;
      this.dividePlayersIntoSections();
    });
    this.roomService.onUpdatePlayer().pipe(takeUntil(this.unsuscriber$)).subscribe((player: Player) => {
      this.updatePlayerInSection(player);
      const indexPlayer = this.players.findIndex(p => p.id === player.id);
      if(indexPlayer === -1) return;
      this.players[indexPlayer] = player;
    });
  }

  isPlayerSession(): boolean {
    return this.playerSession.gameMode === 'player' ? true : false
  }

  private updatePlayerInSection(player: Player): void {
    for(const element of this.sections) {
      const index = element.findIndex(p => p.id === player.id);
      if(index === -1) return;
      element[index] = player;
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  copyToUrl(): void {
    this.isShowInfo = true;
    this.messageInfo = 'Copiado al portapapeles';
    setTimeout(() => {
      this.isShowInfo = false;
      this.messageInfo = '';
    }, 2000);
  }

  changeMode(mode: 'player' | 'viewer'): void {
    this.playerSession.gameMode = mode;
    this.roomService.onChangeMode(this.playerSession);
  }
}
