let pdfParsed = new Promise((resolve, reject) => {

    const fs = require('fs')
    const pdfParse = require('pdf-parse')
    const pdfFile = fs.readFileSync("./cri2.pdf")

    pdfParse(pdfFile).then(data => {
        return data.text.split(/(?=PROPOSITION DE)/)
    })
    .then(data => {
        let postData = []
        data.forEach((element, index) => {
            if (element.indexOf('PROJETS DE') > -1) {
                let postData2 = element.split(/(?=PROJETS DE)/)
                postData2.forEach((el, index) => {
                    if (el.indexOf('PROJET DE') > -1) {
                        postData4 = el.split(/(?=PROJET DE)/)
                        postData4.forEach((element, index) => {
                            postData.push(element)
                        })
                    }
                    else {
                        postData.push(el) 
                        }})
            }
            else if (element.indexOf("PROJET DE") > -1) {
                let postData3 = element.split(/(?=PROJET DE)/)
                postData3.forEach((el, index) => {
                    postData.push(el.split(/(?=PROJET DE)/))
                })
            }
            else postData.push(element)
        })
        return postData

    })
    .then(data => {
        let refinedData = []
        let tostrEl
        data.forEach((element, index) => {
            if (Array.isArray(element)) {
                tostrEl = element.toString()
                refinedData.push(tostrEl)
            } else {
                refinedData.push(element)
            }
        })
        return refinedData
    })
    .then(data => {
            let laws = []
            let law
            data.forEach((element, index) => {
                let pos = element.indexOf('sera soumis à la sanction du Gouvernement')
                if (pos == -1) pos = element.indexOf('sera donné connaissance au Gouvernement');
                if (pos == -1) pos = 0;
                if (pos !== 0) law = element.replace(/[\n\t\r]/g, " ").substr(0, pos)
                if (law) {
                    let title = law.substr(0, law.indexOf('Vote nominatif'))
                    let sanction
                    let negativeStep = law.indexOf('Ont répondu non')
                    let abstainedStep = law.indexOf('Se sont abstenus')
                    let approuved
                    let refused
                    let abstained
                    if (negativeStep > -1) {
                        approuved = law.slice(law.indexOf('Ont répondu oui') + 29, negativeStep).replace(/[\n\t\r\.\- ]/g, "").split(',')
                        if (abstainedStep > -1) {
                            refused = law.slice(law.indexOf('Ont répondu non') + 29, law.indexOf('Se sont abstenus')).replace(/[\n\t\r\.\- ]/g, "").split(',')
                            abstained = law.slice(law.indexOf('Se sont abstenus') + 30, law.indexOf('En conséquence')).replace(/[\n\t\r\.\- ]/g, "").split(',')

                        } else {
                            refused = law.slice(law.indexOf('Ont répondu non') + 29, law.indexOf('En conséquence')).replace(/[\n\t\r\.\- ]/g, "").split(',')
                            abstained = null
                        }

                    } else if (abstainedStep > -1) {
                        approuved = law.slice(law.indexOf('Ont répondu oui') + 29, law.indexOf('Se sont abstenus')).replace(/[\n\t\r\.\- ]/g, "").split(',')
                        abstained = law.slice(law.indexOf('Se sont abstenus') + 30, law.indexOf('En conséquence')).replace(/[\n\t\r\.\- ]/g, "").split(',')
                        refused = null

                    } else {
                        approuved = law.slice(law.indexOf('Ont répondu oui') + 29, law.indexOf('En conséquence')).replace(/[\n\t\r\.\- ]/g, "").split(',')
                        abstained = null
                        refused = null
                    }
                    let participantsArr = []
                    let participantsObj = {
                        approuved: approuved,
                        refused: refused,
                        abstained: abstained
                    }
                    participantsArr.push(participantsObj)
                    if (law.indexOf('est adopté') > -1) {
                        sanction = "passed"
                    } else if (law.indexOf("pas adopté") > -1) {
                        sanction = "refused"
                    }
                    else {
                        sanction = "unknown"
                    }
                    lawObj = {
                        title: title,
                        participants: participantsArr,
                        sanction: sanction
                    }
                    laws.push(lawObj)

                }
            })
            return laws

        })
    .then(data => {
            resolve(data)
        })


})



module.exports = pdfParsed