import { Component, OnInit } from '@angular/core';
import { Http ,Response} from '@angular/http';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  data;
  constructor(private http: Http) { 
        this.http.get('./assets/employee.json')
                  .subscribe(result => this.data =result);
                  console.log(this.data);
  }

  
    

  ngOnInit() {
  }

}
