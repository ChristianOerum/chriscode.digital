async function pipedriveCall(endpoint) {

    const companyUrl = "bubblesaps"
    const token = "b8e12906a11c6c9ba7eeae923e5f23a54adab5d1";
    const limit = "500"

    let start = 0
    let tempArr = []
    let MRR = 0
    let CLV = 0
    let CLV_count = 0
    let Opsalg_MRR = 0
    let LHV = 0
    let google_sheetData = 0
    let salg_DM = 0
    let antalSkoler = 0
    let antalKommuner = 0
    let antalBrugere = 0
    let markdsStørrelse = 0
    let bookedDemo = 0
    let afholdtDemo = 0


    while (tempArr.length == start) {
        let url = `https://${companyUrl}.pipedrive.com/api/v1/${endpoint}?start=${start}&limit=${limit}&api_token=${token}`
        console.log(url)
        await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            tempArr.push(...data.data)
            console.log(tempArr)
            start += 500
        })
        }

        for (let i = 0; i < tempArr.length; i++) {
            //MRR
            if(tempArr[i].value != 0 && tempArr[i].status == "won" ){
                MRR += tempArr[i].fc934713f91688605b3c516dc29de0a897a865bf
            }  

            //CLV + lukkede handler værdi
            if (tempArr[i].status == "won") {
                CLV += tempArr[i].value
                CLV_count += 1

                LHV += tempArr[i].value

                if(tempArr[i].close_time == (new Date()).getMonth() + 1) {
                    salg_DM += 1 
                }
            }
            
            //Opsalg MRR
            if (tempArr[i].status == "won" && tempArr[i]["41bf727b06a597ee86020f7b240b88cc02ec9a74"] == "24" && tempArr[i].first_won_time ==  (new Date()).getMonth() + 1) {
                Opsalg_MRR += tempArr[i].fc934713f91688605b3c516dc29de0a897a865bf
            }

        } 

        //google sheet data.
        await fetch("https://docs.google.com/spreadsheets/d/1-HhNg6BcIrBGFkqS0sgMYrX-6BI_G6tutCURuajqEjQ/edit?usp=sharing")
            .then(response => response.text())
            .then(data => {
                const rows = data.split('\n').slice(1);
                const jsonData = rows.map(row => {
                const temp_strToArr = (rows[2].split('"'))[0]
                google_sheetData = temp_strToArr.split(",")

                antalSkoler = google_sheetData[3]
                antalKommuner = google_sheetData[4]
                antalBrugere = google_sheetData[5]
                markdsStørrelse = google_sheetData[6]
                bookedDemo = google_sheetData[7]
                afholdtDemo = google_sheetData[8]
            })
        })

        console.log("MRR= " + MRR)
        console.log("ARR= " + (MRR*12))
        console.log("CLV= " + (CLV/CLV_count))
        console.log("Opsalg_MRR= " + Opsalg_MRR)
        console.log("Lukkede handler værdi= " + LHV)
        console.log("CAC= " + google_sheetData[0])
        console.log("CACPayback= " + google_sheetData[1])
        console.log("CAC/CLV= " + ((CLV/CLV_count)/Number(google_sheetData[0])))
        console.log("Antal salg/måned= " + salg_DM)
        console.log("Antal salg/mål= " + ((salg_DM/google_sheetData[2])*100).toFixed(1) + "%" )
        console.log("Churn rate?")
        console.log("Revenue Churn Rate (ARR%)?")
        console.log("Revenue Churn Rate (Churn + UP)?")
        console.log("Booket demo= " + bookedDemo)
        console.log("Afholdt demo= " + afholdtDemo)
        console.log("K.G. mellem B.D. og A.D= " + ((afholdtDemo/bookedDemo)*100).toFixed(1) + "%")
        console.log("K.G. mellem B.D. og Salg= " + ((salg_DM/bookedDemo)*100).toFixed(1) + "%")

        console.log("Antal skoler= " + antalSkoler)
        console.log("Antal Kommuner= " + antalKommuner)
        console.log("Antal brugere= " + antalBrugere)
        console.log("Markedsandele= " + ((antalSkoler/markdsStørrelse)*100).toFixed(3) + "%")


    }

    

    //https://bubblesaps.pipedrive.com/api/v1/persons?start=0&limit=500&api_token=b8e12906a11c6c9ba7eeae923e5f23a54adab5d1