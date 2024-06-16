import { Component, OnInit } from '@angular/core';
import { ChessBoard } from 'src/app/chess-logic/chess-board';
import { Color, Coords, FENChar, pieceImagePaths, SafeSquares } from 'src/app/chess-logic/models';
import { SelectedSquare } from './models';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css']
})
export class ChessBoardComponent implements OnInit {
  public pieceImagePaths = pieceImagePaths;
  private chessBoard = new ChessBoard();
  public chessBoardView: (FENChar | null)[][] = this.chessBoard.chessBoardView;
  public get playerColor(): Color{return this.chessBoard.playerColor;};
  public get safeSquares(): SafeSquares {return this.chessBoard.safeSquares;};

  private selectedSquare: SelectedSquare = {piece: null};
  private pieceSafeSquares: Coords[] = [];

  public isSquareDark(x: number, y: number): boolean {
    return ChessBoard.isSquareDark(x, y);
  }

  constructor() { }

  ngOnInit(): void {
  }

  public selectingPiece(x: number, y: number): void {
    const piece: FENChar | null = this.chessBoardView[x][y];
    if(!piece) return;

    this.selectedSquare = {piece, x, y};
    this.pieceSafeSquares = this.safeSquares.get(x + "," + y) || [];
  }

}
