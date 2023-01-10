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


    }

    

    //https://bubblesaps.pipedrive.com/api/v1/persons?start=0&limit=500&api_token=b8e12906a11c6c9ba7eeae923e5f23a54adab5d1