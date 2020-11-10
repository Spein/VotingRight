let pdfParsed = new Promise((resolve, reject) => {

    const fs = require('fs')
    const pdfParse = require('pdf-parse')
    const pdfFile = fs.readFileSync("./cri29.pdf")

    pdfParse(pdfFile).then(data => {
            let laws = {
                date: null,
                content: null
            }
            let rawDate = data.text.slice(data.text.indexOf("Séance plénière*") + 16, data.text.indexOf("*Application de l")).replace(/[\n\t\r\.\-]/g, "")
            const frToEn = {
                "janvier": "january",
                "février": "february",
                "mars": "march",
                "avril": "april",
                "mai": "may",
                "juin": "june",
                "juillet": "july",
                "août": "august",
                "septembre": "september",
                "octobre": "october",
                "novembre": "november",
                "décembre": "december"
            }
            let parsedDate = rawDate.split(' ')[1].replace('er', '') + ' ' + frToEn[rawDate.split(' ')[2].toLowerCase()] + " " + rawDate.split(' ')[3]
            let date = new Date(parsedDate).toString()

            laws.date = date
            laws.content = data.text.split(/(?=PROPOSITION DE)/)
            return laws
        })
        .then(data => {
            let laws = {
                date: data.date,
                content: []
            }

            data.content.forEach((element, index) => {


                if (element.indexOf('PROJETS DE') > -1) {
                    let postData2 = element.split(/(?=PROJETS DE)/)
                    postData2.forEach((el, index) => {
                        if (el.indexOf('PROJET DE') > -1) {
                            postData4 = el.split(/(?=PROJET DE)/)
                            postData4.forEach((element, index) => {
                                laws.content.push(element)
                            })
                        } else {
                            laws.content.push(el)
                        }
                    })
                } else if (element.indexOf("PROJET DE") > -1) {
                    let postData3 = element.split(/(?=PROJET DE)/)
                    postData3.forEach((el, index) => {
                        laws.content.push(el.split(/(?=PROJET DE)/))
                    })
                } else laws.content.push(element)
            })
            return laws

        })
        .then(data => {
            let laws = {
                date: data.date,
                content: []
            }
            let tostrEl
            data.content.forEach((element, index) => {
                if (Array.isArray(element)) {
                    tostrEl = element.toString()
                    laws.content.push(tostrEl)
                } else {
                    laws.content.push(element)
                }
            })
            return laws
        })
        .then(data => {
            let laws = []
            let law
            data.content.forEach((element, index) => {
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
                    } else {
                        sanction = "unknown"
                    }
                    lawObj = {
                        date: data.date,
                        title: title,
                        participants: participantsArr,
                        sanction: sanction,
                        text: law
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