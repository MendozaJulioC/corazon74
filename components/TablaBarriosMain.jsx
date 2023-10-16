'use client'

import React, {useState, useEffect,useRef, useLayoutEffect} from "react"
import $ from "jquery";
import Script from "next/script";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function TableBarriosMain({data}){
  
    const [show, setShow]= useState(false);
    const [datoslider, setDatosLider]=useState();
    let barrio = [];
    const tableRef = useRef()
    const sed = useRef()
    let root;
    let dataSet1 = []
    let dataSett2=[]
    useEffect(()=>{getTableData()},[])
    getTableData()

    async function getTableData(){

   

     
        const res = await fetch(
            "https://j4ch.kratiaanalitik.net/estado/arboletes/listado"
        );
        const respuesta = await res.json();
        console.log(respuesta);
        if(!res.ok){
            throw new Error('Failed to fetch data');
        }

        
        respuesta.data.forEach((element)=>{
            dataSet1.push([
              
                element.cedula,
                element.nombre,
                element.puesto,
                element.mesa,
                element.celular,
               
            ]);
        });



        $.DataTable= require("datatables.net");
        const table = $(tableRef.current).DataTable({
            scrollX: true,
            language:{
                lengthMenu: "Mostar _MENU_ regsitros por página",
                zeroRecords: "No encuentra datos- lo Siento!!",
                info: "Vistas página _PAGE_ de _PAGES_",
                infoEmpty: "NO hay resgistros disponibles",
                infoFiltered: "(filtred from _MAX_ total resgistros)",
                search:"Buscar",
                paginate:{
                    first:"Primera",
                    last:"Última",
                    next:"Siguiente",
                    previous:"Anterior"
                },
                processing: "Procesando...",
            },
            data: dataSet1,
            fixedHeader: true,
            scrollCollapse: true,
            processing: "Procesando...",
            columns:[
              {
                name: "cedula",
                title: "Cedula",
                sortable: true,
                width: "2rem",
                className: "text-center",
              },
              { 
                name:       "nombre",
                title:      "Nombre",
                selector:   "id",
                sortable:   true,
                width: "10rem",
            
                hederStyle:(selector, id)=>{
                    return {textAling :"center"};
                },

            },
            {
                name: "puesto",
                title: "Puesto",
                sortable:true,
                width: "4rem",
               textAling:"center"
            },
            {
                name:"mesa",
                title:"# Mesa",
                sortable:true,
                width:"1rem"
            },{
                name:"celular",
                title:"#Celular",
                sortable: true,
                width:"1rem"
            }
            ],
            columnDefs:[
                
               
                  {width:"2rem", targets:0, className:"text-rigth"},
                  {width:"50rem", targets:1, className:"text-center"},
                  {width:"20rem", targets:2, className:"text-center"},   
                  {width:"10rem", targets:3, className:"text-center"},
                  {width:"10rem", targets:4, className:"text-center"},
             
           
            ],
            destroy:true,
            }
        )
   
        return function(){
            console.log("Table destroyed");
            table.destroy();
        }
    }
    return(
        <>
        {/* <Script crossorigin src="hhttps://code.jquery.com/jquery-3.7.0.js" async></Script> */}
        {/* <Script crossorigin src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js" async></Script> */}

        <div className="p-2 rounded-2xl  shadow-md shadow-blue-500/50 py-1 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-0">
         <div className="p-4 py-10">
           <table className=" hover stripe" style={{ width: '100%' }} ref={tableRef}></table> 
         </div>
        </div> 
        </>
    )
}