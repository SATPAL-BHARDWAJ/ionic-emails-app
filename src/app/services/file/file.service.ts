import { Injectable, NgZone } from '@angular/core';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  files: any = [];

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private plt: Platform,
    private zone: NgZone
  ) { }

  async selectImage() {
    const actionSheet = await this.actionSheetCtrl.create({
        header: "Select Image source",
        buttons: [{
                text: 'Select from gallery',
                icon: !this.plt.is('ios') ? 'image' : null,
                handler: () => {
                    this.takePicture(CameraSource.Photos);
                }
            },
            {
                text: 'Take a pic',
                icon: !this.plt.is('ios') ? 'camera' : null,
                handler: () => {
                    this.takePicture(CameraSource.Camera);
                }
            },
            {
                text: 'Cancel',
                icon: !this.plt.is('ios') ? 'close' : null,
                role: 'cancel'
            }
        ]
    });
    await actionSheet.present();
  }

  async takePicture(sourceType: CameraSource) {

    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: sourceType,
      quality: 60
    });

    this.zone.run(() => {
      this.files.unshift({
        path: capturedPhoto.path,
        src: capturedPhoto.webPath
      });
    })
  
    console.log(this.files);
  }

}

