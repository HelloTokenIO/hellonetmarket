import { Injectable } from '@angular/core';
import { Http ,Response} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { SupportAgents } from './SupportAgents';

@Injectable()


export class GetclientService {

constructor(private http: Http) { 
  this.http.get('data/data.json')
                .subscribe(res => this.data = res.json());
}

configUrl = 'assets/config.json';

data;


}
