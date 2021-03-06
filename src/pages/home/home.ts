import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { ToastController } from "ionic-angular";
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServicesProvider } from '../../providers/input-dialog-services/input-dialog-services';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  title = "Groceries Home ";

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public dataService: GroceriesServiceProvider,
    public InputDialogServices: InputDialogServicesProvider,
    public socialSharing: SocialSharing

  ) {}
  
  loadItems(){
    return this.dataService.getItems()
  }
  
  addItem(){
    console.log('it adding')
    this.InputDialogServices.showPrompt()
  }
 
  removeItem(item, index) {

    let toast = this.toastCtrl.create({
      message: 'Remoiving Item - ' + item.name+ '....',
      duration: 3000,
      position: "top"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
    this.dataService.removeItem(index)
  }

  shareItem(item, index) {

    let toast = this.toastCtrl.create({
      message: 'Share Item - ' + item.name+ '....',
      duration: 3000,
      position: "top"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });
    let message = "Grocery Item Name : "+ item.name + "Quanity : "+ item.quanity;
    let subject = "Share Via Grocery App"
    toast.present();
    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log("Successful")
    }).catch(() => {
      // Sharing via email is not possible
      console.log("Error", Error)

    });
    
  }
  editItem(item, index) {

    let toast = this.toastCtrl.create({
      message: 'Edit Item - ' + item.name+ '....',
      duration: 3000,
      position: "top"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
    this.InputDialogServices.showPrompt(item,index)
  }
 
}
