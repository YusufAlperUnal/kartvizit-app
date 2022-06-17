import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CardService} from "../../services/card.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from '@angular/material/snack-bar';
import {Card} from "../../models/card";

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  cardForm!: FormGroup


  constructor(
    private dialogRef: MatDialogRef<CardModalComponent>,
    private fb: FormBuilder,
    private cardService: CardService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Card
  ) {
  }

  ngOnInit(): void {
    console.log(this.data)
    this.cardForm = this.fb.group({
      id: [this.data?.id || null, Validators.required],
      name: [this.data?.name || null, Validators.required],
      username: [this.data?.username || null, Validators.required],
      address: this.fb.group({
        city:['ankara' || null],
        street:['bilkent' || null]
      })
    })
  }

  addCard(): void {
    console.log(this.cardForm.value)
    this.cardService.addCard(this.cardForm.value)
      .subscribe((res: any) => {
        console.log(res);
        this._snackBar.open(  "Kartvizit başarıyla ekledin",undefined,{duration:1000,horizontalPosition:"left"});
      },(err:any)=>{
        this.getError(err.message  ||"Kartvizit eklenirken bir sorun oluştu.")
      });
    this.dialogRef.close(this.cardForm.value);
}
  updateCard():void{
    this.cardService.updateCard(this.cardForm.value,this.data.id).subscribe((res:any)=> {
      this._snackBar.open(  "Kartvizit başarıyla ekledin",undefined,{duration:1000,horizontalPosition:"left"});
    })
    this.dialogRef.close(this.cardForm.value);
  }
  deleteCard(): void {
    this.cardService.deleteCard(this.data).subscribe((res: any) => this._snackBar.open("Kartvizit başarıyla sildin", undefined, {
      duration: 1000,
      horizontalPosition: "left"
    }))
    this.cardService.getCards();
    this.dialogRef.close();
  }
  getError(message:string):void{
    this._snackBar.open(message,"",{
      duration:4000
    })
  }
}
