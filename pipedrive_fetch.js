async function pipedriveCall(endpoint) {

    const companyUrl = "bubblesaps"
    const token = "b8e12906a11c6c9ba7eeae923e5f23a54adab5d1";
    const limit = "500"

    let start = 0
    let tempArr = []


    while (tempArr.length == start) {
        let url = `https://${companyUrl}.pipedrive.com/api/v1/${endpoint}?start=${start}&limit=${limit}&api_token=${token}`
        console.log(url)
        await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            tempArr.push(...data.data)
            console.log(tempArr)
            start += 500
            console.log(start)
        })
        }
    }

    

    //https://bubblesaps.pipedrive.com/api/v1/persons?start=0&limit=500&api_token=b8e12906a11c6c9ba7eeae923e5f23a54adab5d1