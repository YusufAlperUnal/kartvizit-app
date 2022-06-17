import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {CardModalComponent} from "./card-modal/card-modal.component";
import {CardService} from "../services/card.service";
import {Card} from "../models/card";


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  cardItems: Card[] = [];

  constructor(
    public dialog: MatDialog,
    private cardService: CardService
  ) {
  }

  ngOnInit(): void {
    this.getCards();
  }


  openAddCardModal() {
    const dialog = this.dialog.open(CardModalComponent, {width: "400px"})
    dialog.afterClosed().subscribe(res => {
      if (res) {
        this.cardItems.push(res);
      }
    })
  }

  getCards(): void {
    this.cardService.getCards().subscribe((res) => {
      console.log(res)
      this.cardItems = res;
    })
  }

}
