import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, FormControlName, Validators } from '@angular/forms';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventosFiltrados: Evento[];
  eventos: Evento[];
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  modalRef: BsModalRef;
  registerForm: FormGroup;

  // tslint:disable-next-line:variable-name
  _filtroLista = '';

  constructor(
      private eventoService: EventoService
    , private modalService: BsModalService
    ) { }

  get filtroLista(): string{
    return this._filtroLista;
  }
  set filtroLista(value: string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
    this.validation();
    this.getEventos();
  }

  filtrarEventos(filtrarPor: string): Evento[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  alternarImagem(){
    this.mostrarImagem = !this.mostrarImagem;
  }

  validation(){
    this.registerForm = new FormGroup({
      // tslint:disable-next-line:new-parens
      tema: new FormControl('',
        [Validators.required, Validators.minLength(4), Validators.maxLength(50) ]),
      // tslint:disable-next-line:new-parens
      local: new FormControl('', Validators.required),
      // tslint:disable-next-line:new-parens
      dataEvento: new FormControl('', Validators.required),
      // tslint:disable-next-line:new-parens
      imagemURL: new FormControl('', Validators.required),
      // tslint:disable-next-line:new-parens
      qtdPessoas: new FormControl('',
        [Validators.required, Validators.max(120000)]),
      // tslint:disable-next-line:new-parens
      telefone: new FormControl('', Validators.required),
      // tslint:disable-next-line:new-parens
      email: new FormControl('',
        [Validators.required, Validators.email])
    });
  }

  salvarAlteracao(){

  }

  getEventos(){
    this.eventoService.getAllEvento().subscribe(
      // tslint:disable-next-line:variable-name
      (_eventos: Evento[]) => {
      this.eventos = _eventos;
      this.eventosFiltrados = this.eventos;
      console.log(_eventos);
    }, error => {
      console.log(error);
    });
  }

}
