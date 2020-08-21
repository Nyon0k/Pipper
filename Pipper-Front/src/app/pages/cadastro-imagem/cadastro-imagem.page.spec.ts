import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CadastroImagemPage } from './cadastro-imagem.page';

describe('CadastroImagemPage', () => {
  let component: CadastroImagemPage;
  let fixture: ComponentFixture<CadastroImagemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroImagemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroImagemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
