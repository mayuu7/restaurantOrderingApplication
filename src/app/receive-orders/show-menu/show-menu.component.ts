import { Component, OnInit } from '@angular/core';
import { IMenuData } from 'src/app/interfaces/iMenuData';
import { ReceiveOrdersApiService } from 'src/app/api/receiveOrdersApi';

@Component({
  selector: 'app-show-menu',
  templateUrl: './show-menu.component.html',
  styleUrls: ['./show-menu.component.scss']
})
export class ShowMenuComponent implements OnInit {


  constructor(private receiveOrdersApiService:ReceiveOrdersApiService) {
  }


  menuData: IMenuData[];
  filteredMenuData: IMenuData[];
  errorMessage: string;
  events: string[] = [];
  opened: boolean;
  filteredCategories : string[] = [];
  isCategoryFilteringOnFlag : boolean = false;
  selectedCategory : string;

  _searchString :string;
  get searchString(): string{
    return this._searchString;
  }

  set searchString(value:string){
    this._searchString = value;
    console.log(value);
    if(this.isCategoryFilteringOnFlag==false){
      this.filteredMenuData = this.searchString ? this.performFilter(this.searchString) : this.menuData;
    }
    else{
      this.filteredMenuData = this.searchString ? this.performFilter(this.searchString) : this.filterByCategory(this.selectedCategory);

    }
  }


  ngOnInit(): void {
    this.receiveOrdersApiService.getMenuData().subscribe({
      next: menuData => {
        this.menuData = menuData;
        this.filteredMenuData=this.menuData;
        this.filteredCategories = this.getUniqueCategory(this.menuData);
      },
      error: err => this.errorMessage = err
    })
  }

  performFilter(filterBy : string) : IMenuData[]{
    if(this.isCategoryFilteringOnFlag == false)
    {
      filterBy= filterBy.toLowerCase();
      return this.menuData.filter((menuData : IMenuData) =>
      menuData.dishName.toLowerCase().indexOf(filterBy) !== -1);
    }
    else{
      filterBy= filterBy.toLowerCase();
      return this.filteredMenuData.filter((menuData : IMenuData) =>
      menuData.dishName.toLowerCase().indexOf(filterBy) !== -1);
    }
  }

  getUniqueCategory(menuData : IMenuData[]) : string[]{
    var filteredCategoryArray : string[] =['All'];
    var dishCategoryName : string;
    for(let menuItem of menuData){
      dishCategoryName = menuItem.dishCategory;
      if(filteredCategoryArray.length == 0){
        filteredCategoryArray.push(dishCategoryName);
      }
      else{
        var categoryExistFlag : boolean = false;
        for(let dishCategoryItem of filteredCategoryArray){
          if(dishCategoryItem==dishCategoryName){
            categoryExistFlag = true;
            break;
          }
        }
        if(categoryExistFlag == false){
          filteredCategoryArray.push(dishCategoryName);
        }
      }
    }
    return filteredCategoryArray;
  }


  filterByCategory(categoryName:string) : IMenuData[]{
    categoryName= categoryName.toLowerCase();
    if(categoryName == "all"){
      this.filteredMenuData = this.menuData;
      return this.filteredMenuData;
    }
    this.filteredMenuData = this.menuData.filter((menuData : IMenuData) =>
    menuData.dishCategory.toLowerCase().indexOf(categoryName) !== -1);
    this.isCategoryFilteringOnFlag=true;
    this.selectedCategory = categoryName;
    return this.filteredMenuData;
  }

}
