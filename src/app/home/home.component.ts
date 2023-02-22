import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Relatorio } from '../models/relatorio';
import { RelatorioService } from '../services/relatorio.service';

import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {

  dataSourceRelatorio = new MatTableDataSource;

  displayedColumns: string[] = ['nm_paciente',
  'dt_auditoria',
  'nm_convenio',
  'cd_atendimento',
  'cd_reg_fat',
  'cd_reg_amb',
  'cd_gru_fat',
  'cd_pro_fat',
];


  relatorio:Relatorio[] = [];

  constructor(private relatorioservice: RelatorioService) { }

  ngOnInit(): void {
    
  }

  visualizarDados(){
    this.relatorio = [];

    
    var data = document.querySelector('form')?.getElementsByTagName('input')[0].value;
    var dataFinal = document.querySelector('form')?.getElementsByTagName('input')[1].value;
    

    if(data === undefined || data === null || dataFinal === undefined || dataFinal === null){
      alert("dados inválidos");
      return;
    }

    data = data.replace("-","/");
    dataFinal = dataFinal.replace("-","/");
    data = data.replace("-","/");
    dataFinal = dataFinal.replace("-","/");
    

    var vector1 = data.split('/');
    var aux1 = vector1[0];
    vector1[0] = vector1[2];
    vector1[2] = aux1;

    var dataResult = vector1[0] + '/' + vector1[1] + '/' + vector1[2];

    var vector2 = dataFinal.split('/');

    var aux2 = vector2[0];
    vector2[0] = vector2[2];
    vector2[2] = aux2;

    var dataFinalResult = vector2[0] + '/' + vector2[1] + '/' + vector2[2];

    console.log(dataResult);
    console.log(dataFinalResult);


    let relatorioJson = "?dt_auditoriaInicial=" + data+"&dt_auditoriaFinal=" + dataFinal;
    
   this.relatorioservice.getRelatorio2([dataResult,dataFinalResult]).subscribe((relatorioX:Relatorio[])=>{
      
      if (relatorioX.length === 0) {
        
        alert('relatório sem dados');
      }else{
        alert('relatório com dados');
        let dados = 'Resultado da consulta:\n';
        for(let i = 0; i < relatorioX.length;i++){
          dados += 'nome do usuario: '+relatorioX[i].nm_paciente + '\n';
          dados += 'data inicial: '+relatorioX[i].dt_auditoria + '\n';
          dados += '\n';
          
          this.relatorio.push(relatorioX[i]);

        }
        
        this.dataSourceRelatorio.data = relatorioX;
      }
    },
      erro => {
       // console.log('erro');
        this.relatorioservice.handleError;
        
      }
   )
      alert(this.relatorio);
   
  }

}


