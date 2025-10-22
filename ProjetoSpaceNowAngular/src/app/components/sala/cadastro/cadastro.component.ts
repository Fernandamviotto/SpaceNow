import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpanErrorValidationComponent } from '../../shared/span-error-validation/span-error-validation.component';
import { Router } from '@angular/router';
import { environment } from "../../../../environments/environment";
import { PredioModel, AndarModel } from "../../../Models/andar.model";
import { RecursoModel } from "../../../Models/recurso.model";
import { SalaImagemModel } from "../../../Models/sala-imagem.model";
import { SalaRecursoModel } from "../../../Models/sala-recurso.model";
import { SalaResponsavelModel, salaResponsavelModel } from '../../../Models/sala-responsavel.model';
import { SalaTipoModel } from "../../../Models/sala-tipo.model";
import { SalaModel } from "../../../Models/sala.model";
import { AndarService } from "../../../services/andar.service";
import { AppComponentService } from "../../../services/app-component.service";
import { PredioService } from "../../../services/predio.service";
import { RecursoService } from "../../../services/recurso.service";
import { SalaImagemService } from "../../../services/sala-imagem.service";
import { SalaTipoService } from "../../../services/sala-tipo.service";
import { SalaService } from "../../../services/sala.service";
import { MatDialog } from '../../../shared/modal-stubs';
import { AppSettings } from '../../../shared/app-settings';
import { UtilComponent, PersonalDataModel } from '../../../shared/util.component';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.css'],
    standalone: true,
    imports: [FormsModule, CommonModule, SpanErrorValidationComponent],
})
export class CadastroComponent implements OnInit {
    listTimes = [];
    datePipe = new DatePipe('pt-BR');
    appSettings = AppSettings;
    titulo: string = 'Cadastrar nova sala';
    isValid: boolean = true;
    sala: SalaModel = new SalaModel();
    predios: PredioModel[] = new Array<PredioModel>();
    andares: AndarModel[] = new Array<AndarModel>();
    tiposDeSala: SalaTipoModel[] = new Array<SalaTipoModel>();
    tipoDeSala: SalaTipoModel = new SalaTipoModel();
    recursos: RecursoModel[] = new Array<RecursoModel>();
    auxRecursos: RecursoModel[] = new Array<RecursoModel>();
    edicao: boolean = false;
    util = UtilComponent;
    imagens: SalaImagemModel[] = new Array<SalaImagemModel>();
    imagem: SalaImagemModel = new SalaImagemModel();
    personalInfo?: PersonalDataModel;
    urlImagem = (environment as any).urlImagensSalas || '';
    isHabilitado: boolean = true;

    constructor(
        private router: Router,
        private _dialog: MatDialog,
        private _predioService: PredioService,
        private _andarService: AndarService,
        private _salaService: SalaService,
        private _tipoDeSalaService: SalaTipoService,
        private _recursoService: RecursoService,
        private _salaImagemService: SalaImagemService,
        private _appComponentService: AppComponentService
    ) {}

    async ngOnInit() {
        this.personalInfo = await this._appComponentService.getPersonalInfo();
        this.loadRoom();
        this.loadFields();
    }

    loadRoom() {
        if (this._salaService.id || sessionStorage.getItem('roomId')) {
            this.edicao = true;
            this._salaService.id = this._salaService.id ? this._salaService.id : sessionStorage.getItem('roomId');
            sessionStorage.setItem('roomId', this._salaService.id);
        }
    }

    loadFields() {
        if (this.edicao) {
            this._salaService.getRoomById(this._salaService.id, true).subscribe(response => {
                this.sala = response.result;
                this.imagens = this.sala.imagens;
                this.sala.imagens = new Array<SalaImagemModel>();
                this.titulo = this.sala.apelido;
                this.loadBuilding();
                this.loadResource();
                this.loadTypeOfRoom();
                this.isHabilitado = this.sala.ativo;
            });
        } else {
            this.loadBuilding();
            this.loadResource();
            this.loadTypeOfRoom();
        }
    }

    loadBuilding() {
        this._predioService.getAll().subscribe(response => {
            response = response.result;
            this.predios = response;
            if (this.edicao) this.loadFloor();
        });
    }

    loadFloor() {
        this._andarService.getAll(this.sala).subscribe(response => {
            response = response.result;
            this.andares = response;
        });
    }

    loadTypeOfRoom() {
        this._tipoDeSalaService.getAllTypesRooms().subscribe(response => {
            response = response.result;
            this.tiposDeSala = response;
            if (this.edicao) this.loadTypeOfRoomById();
        });
    }

    loadTypeOfRoomById() {
        const found = this.tiposDeSala.find(x => x.salaTipoId == this.sala.salaTipoId);
        if (found) this.tipoDeSala = found;
    }

    loadResource() {
        this._recursoService.getAll().subscribe(response => {
            response = response.result;
            this.recursos = response;
            this.auxRecursos = response;
        });
    }

    save() {
        this.validateForm();
        if (this.isValid) {
            if (!this.edicao) this.insert();
            else this.update();
        }
    }

    insert() {
        this._salaService.insert(this.sala).subscribe(response => {
            if (response.error) {
                this.showMessage(response.error.errors[0].friendlyMessage);
                return;
            }
            this.showMessage('Sala <b>' + this.sala.apelido + '</b>, incluída com sucesso!');
            this.router.navigate(['/salas/consulta']);
        });
    }

    update() {
        this._salaService.update(this.sala.salaId, this.sala).subscribe(response => {
            if (response.error) {
                this.showMessage(response.error.errors[0].friendlyMessage);
                return;
            }
            this.showMessage('Sala <b>' + this.sala.apelido + '</b>, alterada com sucesso!');
            this.router.navigate(['/salas/consulta']);
        });
    }

    setForm() {
        if (!this.personalInfo) return;
        if (this.edicao) {
            this.sala.aliasAlteracao = this.personalInfo.login;
            this.sala.nomeAlteracao = this.personalInfo.fullName;
            return;
        }
        this.sala.aliasCadastro = this.personalInfo.login;
    }

    fieldValidTouched(field: any, form: any) {
        return !field.valid && (field.touched || form.submitted);
    }

    applyCssErrorValidation(field: any, form: any) {
        return { invalid: this.fieldValidTouched(field, form) };
    }

    validateForm() {
        this.setForm();
        if (this.sala.capacidade < 1) {
            this.showMessage('A capacidade da sala deve ser maior do que 0.');
            this.isValid = false;
        }
    }

    showMessage(message?: string) {
        this._dialog.open(ModalComponent, {
            data: {
                title: 'Insper Space',
                message: message || 'Insper Space',
            },
        });
    }

    back() {
        sessionStorage.removeItem('roomId');
        this.router.navigate(['/salas/consulta']);
    }

    changeResource(event: any, index: number) {
        if (this.sala.recursos.filter(x => x.recursoId == event.target.value).length > 1) {
            $('#drpRecurso_' + index).val('0');
            this.sala.recursos[index].recursoId = 0;
        }
        this.isValidResources();
    }

    changeTypeOfRoom() {
        this.loadTypeOfRoomById();
    }

    isValidResources() {
        let isValid: boolean = true;
        this.sala.recursos.forEach(recurso => {
            if (recurso.recursoId < 1 || recurso.recursoId == null) {
                isValid = false;
            } else if (recurso.qtdRecurso < 1 || recurso.qtdRecurso == null) isValid = false;
        });
        if (!isValid) {
            this.isValid = false;
        } else this.isValid = true;
    }

    isValidResponsibles(showMessage = true) {
        let isValid: boolean = true;
        let correctFormat: boolean = true;
        this.sala.responsaveis.forEach(responsavel => {
            if (responsavel.responsavelEmail == '') isValid = false;
            else if (!this.util.isValidEmail(responsavel.responsavelEmail)) {
                isValid = false;
                correctFormat = false;
            }
        });

        this.isValid = isValid;

        if (!correctFormat && showMessage) this.showMessage('O endereço de e-mail informado não é um e-mail válido.');
    }

    removeResource(index: number) {
        this.sala.recursos.splice(index, 1);
        this.isValidResources();
    }

    addResource() {
        this.sala.recursos.push(new SalaRecursoModel(1));
        this.isValidResources();
    }

    addResponsible() {
        this.sala.responsaveis.push(new SalaResponsavelModel());
        this.isValidResponsibles();
    }

    removeResponsible(index: number) {
        this.sala.responsaveis.splice(index, 1);
        this.isValidResponsibles();
    }

    isValidImages() {
        let isValid: boolean = true;
        this.sala.imagens.forEach(imagem => {
            if (imagem.imagem == '') isValid = false;
        });

        if (!isValid) this.isValid = false;
        else this.isValid = true;

        this.adjustImageOrder();
    }

    addImage() {
        if (this.sala.imagens == null) this.sala.imagens = new Array<SalaImagemModel>();

        this.sala.imagens.push(new SalaImagemModel());
        this.isValidImages();
    }

    removeImage(index: number) {
        this.sala.imagens.splice(index, 1);
        this.isValidImages();
    }

    deletePhysicalImage(imageId: number, index: number) {
        const dialogRef = this._dialog.open(ModalConfirmComponent, {
            data: {
                title: 'Insper Space',
                message: `Deseja realmente excluir a imagem?`,
            },
        });

        dialogRef.afterClosed().subscribe((result: any) => {
            if (result) {
                this._salaImagemService.delete(imageId).subscribe(
                    (response: any) => {
                        this.showMessage(`A imagem foi excluída com sucesso.`);
                        this.imagens.splice(index, 1);
                        this.adjustImageOrder();
                    },
                    (error: any) => this.showMessage('Erro ao excluir a imagem.')
                );
            }
        });
    }

    changeFile(event: any, index: number) {
        const file = event.target.files && event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (reader.result) this.sala.imagens[index].fileBase64 = reader.result.toString().split(',')[1];
        };

        const filename = event.target && event.target.value ? event.target.value : '';
        this.sala.imagens[index].imagem = this.util.adjustFileNameUpload(filename) || '';
        this.isValidImages();
    }

    adjustImageOrder() {
        let length = this.imagens.length;
        this.sala.imagens.forEach(imagem => {
            length++;
            imagem.ordem = length;
        });
    }

    openModalImages(imagem: SalaImagemModel) {
        const dialogRef = this._dialog.open(ModalFotosSalaComponent, {
            data: {
                salaId: imagem.salaId,
                imagemId: imagem.imagemId,
            },
        });

        dialogRef.afterClosed().subscribe((result: any) => {
            $('.modal-backdrop').remove();
        });
    }

    habilitarDesabilitar() {
        if (this.isHabilitado) {
            const alertRef = this._dialog.open(ModalConfirmComponent, {
                data: {
                    title: 'Insper Space',
                    message: `As reservas efetuadas para a sala <b>${this.sala.apelido}</b> serão desalocadas com a inativação da sala.`,
                    confirmText: 'Ciente',
                    cancelText: 'Voltar',
                    isHtml: true,
                },
            });
            alertRef.afterClosed().subscribe((alertResult: any) => {
                if (alertResult) {
                    this.abrirModalConfirmacao();
                }
            });
        } else {
            this.abrirModalConfirmacao();
        }
    }

    abrirModalConfirmacao() {
        const dialogRef = this._dialog.open(ModalConfirmComponent, {
            data: {
                title: 'Insper Space',
                message: this.isHabilitado
                    ? `Esta ação irá desabilitar a sala para alocações futuras. Deseja prosseguir?`
                    : `Esta ação irá habilitar a sala para alocações futuras. Deseja prosseguir?`,
                confirmText: 'Confirmar',
                cancelText: 'Voltar',
            },
        });

        dialogRef.afterClosed().subscribe((result: any) => {
            if (result) {
                if (!this.personalInfo) return;
                this.sala.aliasAlteracao = this.personalInfo.login;
                this.sala.nomeAlteracao = this.personalInfo.fullName;
                this._salaService.alterarSalaAtiva(!this.sala.ativo, this.sala.salaId, this.sala.aliasAlteracao || '', this.sala.nomeAlteracao || '').subscribe({
                    next: () => {
                        this.isHabilitado = !this.isHabilitado;
                        this.sala.ativo = this.isHabilitado;
                        this.showMessage(this.isHabilitado ? 'Sala habilitada com sucesso!' : 'Sala desabilitada com sucesso!');
                    },
                    error: () => {
                        this.showMessage('Erro ao habilitar/desabilitar sala.');
                    },
                });
            }
        });
    }
}
