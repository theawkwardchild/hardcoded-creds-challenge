
function setNewFact(){
    fetch("https://cms.thismaybedown.online/public/fact",{
        headers: {
            "Authorization": "Basic QWRtaW46c2VjcmV0MTIzNA=="
          }
    })
    .then(response => console.log(response.status) || response) // output the status and return response
    .then(response => response.text()) // send response body to next then chain
    .then(body => {
        document.getElementById("tactorfact").innerHTML = body
    }) // you can use response body here
}

setNewFact()