import { Component } from '@angular/core';
import { SearchForm } from './SearchForm';
import { ResultService } from './result.service';
import { HttpClient } from '@angular/common/http';
import { CustomeFadeInAnimation } from './CustomeFadeInAnimation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [CustomeFadeInAnimation]
})


export class AppComponent {

  public title = 'Event Search ';
  public topics = ['Angular', 'Java', 'Javascript'];

  public unitName = [
    { "name": "Miles", "id": "miles" },
    { "name": "Kilometers", "id": "km" }
  ]

  public lat: Number
  public lon: number;
  public isUserInput = false

  public keyword: string;

  public type: any;
  public form = SearchForm
  public url: string
  searchResponse: any
  stats: any

  public show: number = 10;

  ngOnInit() {
    this.searchResponse = undefined
  }

  constructor(private service: ResultService,
    private http: HttpClient) {
  }

  onSubmit() {
    this.searchResponse = undefined
    this.url = '/api/getresult?keyword=' + this.form.keyword + '&rows=50';

    console.log('form is ', this.form)
    if (!this.form.isUserInput) {
      this.url = this.url + '&sort=pageRankFile%20desc'
    }

    this.service.url = this.url
    console.log('hitting url ..', this.service.url)
    this.http.get<any>(this.url).subscribe(data => {
      this.searchResponse = data.response;
      this.stats = data.responseHeader;
      console.log(this.searchResponse)
    });
  }

  updateAttractionId($event) {
  }

  updateCategoryId($event) {
    if ($event.options[$event.selectedIndex]) {
    }
  }


  updateUnitName($event) {
    if ($event.options[$event.selectedIndex]) {
    }

  }


}
