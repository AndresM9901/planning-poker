import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { Player } from '../../config/interfaces/player.interface';
import { SharedService } from '../../shared/services/shared.service';
import { CreatePlayerService } from '../../services/create-player/create-player.service';
import { RoomService } from '../../services/room/room.service';

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
  public scores: any[] = [
    // { point: 0, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 1, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 2, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 3, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 5, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 8, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 13, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 21, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 34, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 55, selectedCard: false, hostSelectCard: false, count: 0 }, { point: 89, selectedCard: false, hostSelectCard: false, count: 0 }, { point: '?', selectedCard: false, hostSelectCard: false, count: 0 }, { point: '☕', selectedCard: false, hostSelectCard: false, count: 0 }
  ];
  public selectedCards: any[] = [];
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
  private adminsPlayers: any[] = [];
  private unsuscriber$: Subject<void> = new Subject<void>();

  public players: Player[] = [
    // {
    //   id: 1,
    //   initialLetter: '',
    //   name: 'Luisa',
    //   gameMode: 'player',
    //   selectedCard: false,
    //   isHost: false,
    //   point: 0,
    // },
    // {
    //   id: 2,
    //   initialLetter: '',
    //   name: 'Vale',
    //   gameMode: 'player',
    //   selectedCard: false,
    //   isHost: false,
    //   point: 0,
    // },
    // {
    //   id: 3,
    //   initialLetter: '',
    //   name: 'Pedro',
    //   gameMode: 'viewer',
    //   selectedCard: false,
    //   isHost: false,
    //   point: 0,
    // },
    // {
    //   id: 4,
    //   initialLetter: '',
    //   name: 'David',
    //   gameMode: 'player',
    //   selectedCard: false,
    //   isHost: false,
    //   point: 0,
    // },
    // {
    //   id: 5,
    //   initialLetter: '',
    //   name: 'Luis',
    //   gameMode: 'player',
    //   selectedCard: false,
    //   isHost: false,
    //   point: 0,
    // },
    // {
    //   id: 6,
    //   initialLetter: '',
    //   name: 'Oscar',
    //   gameMode: 'player',
    //   selectedCard: false,
    //   isHost: false,
    //   point: 0,
    // },
    // {
    //   id: 7,
    //   initialLetter: '',
    //   name: 'Carlos',
    //   gameMode: 'player',
    //   selectedCard: false,
    //   isHost: false,
    //   point: 0,
    // },
  ];

  constructor(private route: ActivatedRoute, private sharedService: SharedService, private createPlayerService: CreatePlayerService, private roomService: RoomService) { }

  ngOnInit() {
    this.openUserModal();
    this.sharedService.isFormSubmitted$.pipe(takeUntil(this.unsuscriber$)).subscribe((value) => this.isFormSubmitted = value);
    this.generateScores();
    this.roomName();
    // crear funcion para llamar los params del route
    this.receiveRoutingParameters();
    this.isViewer = this.checkHostIsModePlayer();
    this.checkOnRevealPoints();
    this.checkOnVotes();
    this.checkOnResetGame();
  }

  checkOnRevealPoints(): void {
    this.roomService.onRevealPoints().pipe(takeUntil(this.unsuscriber$)).subscribe((stateGame) => {
      if(stateGame) {
        this.isRevealPoints = stateGame.isReveal;
        this.isAverageSelected = stateGame.isAverage;
        this.isSelectCards = stateGame.isSelectedCards;
        this.isEndVotes = stateGame.isEndVotes;
      }
    })
  }

  checkOnVotes(): void {
    this.roomService.onCardVotes().pipe(takeUntil(this.unsuscriber$)).subscribe((cardsVotes) => {
      if(cardsVotes) {
        this.selectedCards = cardsVotes.votes;
        this.average = cardsVotes.average;
      }
    })
  }

  openPermissionModal(player: any): void {
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
        this.playerSelected = player; // Actualizar la propiedad con el jugador seleccionado
        this.isShowPermissionModal = true; // Mostrar el modal
        console.log('hola', this.adminsPlayers.includes(player.id));
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
    this.roomService.onUpdateAdmins().pipe(takeUntil(this.unsuscriber$)).subscribe((admins) => {
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
    console.log('se cierra modal');
  }

  checkOnResetGame(): void {
    this.roomService.onResetGame().pipe(takeUntil(this.unsuscriber$)).subscribe((stateGame) => {
      if(stateGame) {
        this.players = stateGame.players;
        console.log(stateGame.players);
        this.scores = stateGame.scores;
        this.selectedCards = stateGame.selectedCards;
        this.average = stateGame.average;
        this.isSelectCards = stateGame.isSelectCards;
        this.isRevealPoints = stateGame.isRevealPoints;
        this.isCardsBlocked = stateGame.isCardsBlocked;
        this.isAverageSelected = stateGame.isAverageSelected;
        this.isEndVotes = stateGame.isEndVotes;
        this.players.forEach((player) => {
          if(player.id === this.playerSession.id) {
            this.playerSession = player;
          }
          this.updatePlayerInSection(player);
        })
      }
    })
  }

  private roomName(): void {
    this.roomService.onNewPlayer().pipe(takeUntil(this.unsuscriber$)).subscribe((value) => {
      if(value) {
        this.roomGameName = value.name;
        this.adminsPlayers = value.admins;
      }
    })
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
    this.extractInitialLetters();
    // Asignar jugadores de forma secuencial a las secciones
    this.sections = Array.from({ length: 5 }, () => []);
    if(this.players) {
      this.players.forEach((player) => {
        const sectionIndex = this.currentSectionIndex;
        if (this.playerSession.id !== player.id) {
          if (sectionIndex === 0 || this.sections[0].length % 2 !== 0) {
            this.sections[sectionIndex].push(player);
            this.currentSectionIndex = (this.currentSectionIndex + 1) % 5;
          }
          else if(this.sections[0].length % 2 === 0 && this.sections[0].length >= 3) {
            if (this.sections[1].length % 2 !== 0 && this.sections[3].length % 2 !== 0) {
              this.sections[sectionIndex].push(player);
              this.currentSectionIndex = (this.currentSectionIndex + 1) % 5;
            }
            else {
              this.sections[sectionIndex-1].push(player);
              this.currentSectionIndex = (this.currentSectionIndex + 1) % 5;
            }
          }
          else {
            this.sections[0].push(player);
            this.currentSectionIndex = (this.currentSectionIndex + 1) % 5;
          }
        } else {
          this.playerSession = player;
        }
      });
    }
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

  private extractInitialLetters(): void {
    if(!this.players) {
      return;
    }
    this.players.forEach(player => {
      // Verificar que el nombre tenga al menos dos letras
      if (player.name && player.name.length >= 2) {
        player.initialLetter = player.name.slice(0, 2);
      }
    });
  }

  checkAllPlayersSelected(players: any[], adminsPlayers: any[]): void {
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

  onPointCardClick(selectedPoint: any): void {
    const selectedCard = this.scores.find(score => score.point === selectedPoint);

    if (this.isInvalidSelection(selectedCard, this.playerSession, selectedPoint)) {
      this.clearSelections(selectedCard, this.playerSession);
    } else if (this.canSelectCard(selectedCard, this.playerSession)) {
      this.selectCard(selectedCard, this.playerSession, selectedPoint);
      this.roomService.selectCard(this.playerSession);
      this.roomService.onSelectedCard().pipe(takeUntil(this.unsuscriber$)).subscribe((game: any) => {
        this.players = game.players;
        this.adminsPlayers = game.admins;
        this.checkAllPlayersSelected(game.players, game.admins);
      })
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
    console.log(this.players);
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

  checkIsAdmin(): boolean {
    const playerHost = this.players.find(player => player.isHost);
    if(playerHost && this.adminsPlayers.includes(playerHost.id)) return true;
    return false;
  }

  private checkHostIsModePlayer(): boolean {
    const playerHost = this.players.find(player => player.isHost);
    if(playerHost && playerHost.gameMode === 'player') {
      return true;
    }
    return false;
  }

  watchPlayerSession(): void {
    this.createPlayerService.playerSession$.pipe(takeUntil(this.unsuscriber$)).subscribe(data => {
      if(data) this.playerSession = data;
    });
  }

  watchPlayers(): void {
    this.roomService.onNewPlayer().pipe(takeUntil(this.unsuscriber$)).subscribe(game => {
      this.players = game.players;
      this.roomGameName = game.name;
      this.adminsPlayers = game.admins;
    });
    this.dividePlayersIntoSections();
  }

  closeUserModal(): void {
    this.isOpenModal = false;
    this.createPlayerService.playerSession$.pipe(takeUntil(this.unsuscriber$)).subscribe(data => {
      if(data) this.playerSession = data;
    });
    this.roomService.onUpdateRoom().pipe(takeUntil(this.unsuscriber$)).subscribe((players: Player[]) => {
      this.players = players;
      this.dividePlayersIntoSections();
    });
    this.roomService.onUpdatePlayer().pipe(takeUntil(this.unsuscriber$)).subscribe((player: Player) => {
      this.updatePlayerInSection(player);
      const indexPlayer = this.players.findIndex(p => p.id === player.id);
      if(indexPlayer !== -1) {
        this.players[indexPlayer] = player;
      }
    });
  }

  isPlayerSession(): boolean {
    if (this.playerSession.gameMode === 'player') return true
    return false;
  }

  private updatePlayerInSection(player: Player): void {
    for(const element of this.sections) {
      const index = element.findIndex(p => p.id === player.id);
      if(index !== -1) {
        element[index] = player;
      }
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
