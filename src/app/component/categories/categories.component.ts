import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  private readonly _CategoriesService=inject(CategoriesService)
  categoriesData:any
  ngOnInit(): void {
   this._CategoriesService.getAllCategories().subscribe({
    next:(res)=>{
      console.log(res)
      this.categoriesData=res.data
    },
    error:(err)=>{
      console.log(err)
    }
   })
  }



}
