import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-specific-categore',
  standalone: true,
  imports: [],
  templateUrl: './specific-categore.component.html',
  styleUrl: './specific-categore.component.scss'
})
export class SpecificCategoreComponent implements OnInit{
  private readonly _CategoriesService=inject(CategoriesService)
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  scId!:any

ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(p)=>{
      console.log(p.get("scId"))
      this.scId=p.get("scId")
    },
    error:(err)=>{
      console.log(err)
    }
  })
this._CategoriesService.getspecCategories(this.scId).subscribe({
  next:(res)=>{
    console.log(res)
  },
  error:(err)=>{
    console.log(err)
  }
})
}




}
