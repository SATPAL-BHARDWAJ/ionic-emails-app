import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EmailComposer, EmailComposerOptions } from '@ionic-native/email-composer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-create-email',
  templateUrl: './create-email.page.html',
  styleUrls: ['./create-email.page.scss'],
})
export class CreateEmailPage implements OnInit, AfterViewInit {

  showOtherTo: boolean = false;
  emailForm: FormGroup;
  attachments: any = [];

  formErrors: any = {};

  constructor(
    private emailComposer : EmailComposer,
    private formBuilder : FormBuilder,
    private fileChooser: FileChooser
  ) { 
    console.log(this.emailComposer);

    this.emailForm = this.formBuilder.group({
      to : new FormControl('', Validators.compose([ 
                              Validators.required, 
                              Validators.email, 
                              Validators.maxLength(50) 
                          ])),
      cc : new FormControl('', Validators.compose([ 
                                Validators.email, 
                                Validators.maxLength(50) 
                              ])),
      bcc : new FormControl('', Validators.compose([ 
                              Validators.email, 
                              Validators.maxLength(50) 
                            ])),
      subject : new FormControl('', Validators.compose([ 
                                      Validators.required, 
                                      Validators.maxLength(50) 
                                    ])),
      body : new FormControl('', Validators.compose([ 
                                  Validators.required, 
                                  Validators.maxLength(500) 
                                ])),
    })

  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    
  }

  sendEmail() {
    console.log(this.emailForm.value);

    if ( !this.emailForm.valid ) {
      console.error('Invalid form is not accepted!');
      return false;
    }

    let email: EmailComposerOptions = {
      ...this.emailForm.value,
      attachments : this.attachments,
      isHtml: true
    }

    // Send a text message using default options
    this.emailComposer.open(email);
  }

  async selectFile() {

    this.fileChooser.open()
        .then(uri => {
          console.log({uri})
          this.attachments.push(uri);
          
        })
        .catch(e => console.log(e));
  }

  getSrc( uri: string ) {
    return Capacitor.convertFileSrc(uri);
  }

  deleteAttachment( i: number ) {
    console.info(`Delete attachment with index -> ${i}`);
    if ( this.attachments[i] ) {
      this.attachments.splice(i, 1);
    }
  }

  getError( input : string ) {
    const errors = this.emailForm.controls[input].errors || {};
    const messages = {
      required : `(${input}) field is required`,
      email : `(${input}) field should be a valid email`,
      maxlength : `(${input}) field should be less than `
    }

    for (let error of Object.keys(errors)) {
      
      if (messages[error]) {
        if ( error === 'maxlength' || error === 'minlength' ) {
          this.formErrors[input] = messages[error] + errors[error]['requiredLength'] + ' chars';
        } else {
          this.formErrors[input] = messages[error];
        }
      } else {
        console.error(`${error} - equivalent message not found!`);
      }
      
      console.log(errors);
    }

    if ( Object.keys(errors).length === 0 ) {
      this.formErrors[input] = null;
    }
  }

}
