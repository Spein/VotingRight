const pdfParsed = require ('./test.js')
'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('deputies.json');
let deputies = JSON.parse(rawdata);

let Deputies = new Promise((resolve, reject) => {

    pdfParsed.then(data=>{  
        const laws=data
        data.forEach((element,ind) => {
            let approuvedArr=element.participants[0].approuved
            approuvedArr.forEach((el, index) => {
                //console.log(el)
                for (var i=0; i < deputies.deputies.length; i++) {
                    new Promise((resolve, reject) => {
        
                    if (deputies.deputies[i].name.indexOf(el)>-1) {
                        let deputy=deputies.deputies[i]
                        laws[ind].participants[0].approuved[index]=deputy
                        resolve()
        
                    }
        
            })
                }
            })

        })
        return laws
     }) 
     .then(data=>{
        //console.log(data[2].participants[0].approuved)
        const laws=data
        data.forEach((element,ind) => {
            let refusedArr=element.participants[0].refused
            if(refusedArr){

            refusedArr.forEach((el, index) => {
                //console.log(el)

                for (var i=0; i < deputies.deputies.length; i++) {
                    new Promise((resolve, reject) => {
        
                    if (deputies.deputies[i].name.indexOf(el)>-1) {
                        let deputy=deputies.deputies[i]
                        laws[ind].participants[0].refused[index]=deputy
                        resolve()
        
                    }
        
            })
                }
            })}

        })
        return laws

     }).then(data=>{
        //console.log(data[2].participants[0].refused)
        const laws=data
        data.forEach((element,ind) => {
            let abstainedArr=element.participants[0].abstained
            if(abstainedArr){

                abstainedArr.forEach((el, index) => {
                //console.log(el)

                for (var i=0; i < deputies.deputies.length; i++) {
                    new Promise((resolve, reject) => {
        
                    if (deputies.deputies[i].name.indexOf(el)>-1) {
                        let deputy=deputies.deputies[i]
                        laws[ind].participants[0].abstained[index]=deputy
                        resolve()
        
                    }
        
            })
                }
            })}

        })
        return laws
    }).then(data=>{
        resolve(data)
    })
  
  
}) 

module.exports = Deputies