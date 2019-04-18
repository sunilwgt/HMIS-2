import { Component, OnInit,  } from '@angular/core';
import { BaseServices } from '../../utils/base.service';
import { BaseComponent } from '../../utils/base.component';

@Component({
  selector: 'hmis-save-message',
  templateUrl: './save-message.component.html'
})

export class SaveMessageModal extends BaseComponent implements OnInit {

  private isEditable:Boolean = true;
  private emailOrPh:String = '';

  constructor(baseService: BaseServices) {
    super(baseService);
  }


  ngOnInit() {

  }

  private okClickHandler():void{
    this.compLoadManager.closePopup();
  }


}
