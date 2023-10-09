import { Component } from '@angular/core';
import { CAjaxservice } from 'src/app/services/ajax.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CModalService, ModalSize } from 'src/app/services/modal-popup.service';



export interface IContact{
  id: Number,
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  address: String,
  city: number,
  state: number,
  country: number,
  postalCode: Number,
  cityName: String,
  stateName: String,
  countryName: String
}
export interface ICity{
  cityId: Number,
  cityName: String
}
export interface IState{
  stateId: Number,
  stateName: String
}
export interface ICountry{
  countryId: Number,
  countryName: String
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent {

contacts!:Array<IContact>;
cities!:Array<ICity>;
states!:Array<IState>;
countries!:Array<ICountry>;

contactform = new FormGroup({
  firstName:new FormControl ('',Validators.required),
  id:new FormControl (0),
  lastName:new FormControl ('',Validators.required),
  email:new FormControl ('',[Validators.required,Validators.email]),
  address:new FormControl ('',Validators.required),
  phoneNumber:new FormControl ('',Validators.required),
  city:new FormControl ('',Validators.required),
  state:new FormControl ('',Validators.required),
  country:new FormControl ('',Validators.required),
  postalCode:new FormControl ('',Validators.required)

})

contactuser(){
  console.warn(this.contactform.value);
}

get firstName(){
  return this.contactform.get("firstName")
}
get lastName(){
  return this.contactform.get("lastName")
}
get email(){
  return this.contactform.get("email")
}
get phoneNumber(){
  return this.contactform.get("phoneNumber")
}
get address(){
  return this.contactform.get("address")
}
get city(){
  return this.contactform.get("city")
}
get state(){
  return this.contactform.get("state")
}
get country(){
  return this.contactform.get("country")
}
get postalCode(){
  return this.contactform.get("postalCode")
}
get btnText(){
  return this.contactform.get("id")?.getRawValue()>0?"Update":"Add"
}


  constructor(private api:CAjaxservice,private modal : CModalService) {
    
  }
  
  ngOnInit(): void 
  {
    this.GetContact();

    this.api.getData('contacts/get-city').subscribe((res:any)=>{
      this.cities=res;
    })

    this.api.getData('contacts/get-state').subscribe((res:any)=>{
      this.states=res;
    })

    this.api.getData('contacts/get-country').subscribe((res:any)=>{
      this.countries=res;
    })

  }

  GetContact(){
    this.api.getData('contacts/get-contacts').subscribe((res:any)=>{
      this.contacts=res;
    })
  }
  onDeleteContact(id:Number){
    var self=this;
    this.modal.confirm("Delete Contact","Are you sure want to Delete?",
    function(){
      self.api.postData('contacts/delete-contacts?id='+id).subscribe((res)=>{
        self.GetContact();
      })

    },function(){});
    
  }
  AddContact(template:any){
    this.contactform.reset();
    this.contactform.patchValue({id: 0})
    this.modal.open(template,ModalSize.Large);
  }
  onEditContact(template:any,datas:any){
    var data=Object.assign({}, datas)
     console.log(data)
    delete data.cityName;
    delete data.stateName;
    delete data.countryName;
    this.contactform.setValue(data);    
    this.modal.open(template,ModalSize.Large);
  }
  
  onSaveContact(){
    this.api.postData('contacts/save-contacts',this.contactform.value).subscribe((res:any)=>{
      this.GetContact();
      this.modal.closeAll();
    })
  }

}







