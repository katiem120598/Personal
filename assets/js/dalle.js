const reqbut = document.getElementById('button-request');
const dalleEndpoint = 'https://api.openai.com/v1/images/generations';
const imgContainer=document.getElementById('image-container');
const reqStatus = document.getElementById('request-status');
reqbut.onclick = function(){
    reqStatus.innerHTML = "performing request...";
    reqStatus.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const prompt = document.getElementById('text-prompt').value;
    var getkey = document.getElementById('api-key').value;
    if (getkey==="friends&fam"){
        getkey= "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";
    }
    const imgradios = document.getElementsByName('image-size');
    const googleradios = document.getElementsByName('googlyeyes');
    imgContainer.innerHTML = "";
    let size;
    for (let i = 0; i<imgradios.length; i++)
    {
        if (imgradios[i].checked)
        {
            size = imgradios[i].value;
            break;
        }
    }
    for (let i = 0; i<googleradios.length; i++)
    {
        if (googleradios[i].checked)
        {
            googles = googleradios[i].value;
            break;
        }
    }
    getkey;
    const reqBody = {
        prompt: `${prompt}... but make it girlypop ${googles}.`, 
        model: 'dall-e-3',
        size: size,
        response_format: "url",
    }

    const reqparams = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getkey}`,
        },
        body: JSON.stringify(reqBody)
    }
    fetch(dalleEndpoint, reqparams)
        .then(res => res.json())
        .then(addImages) 
        .catch(error => reqStatus.innerHTML = error);
}

function addImages(jsonData){

    if (jsonData.error)
    {
        reqStatus.innerHTML = 'ERROR: '+jsonData.error.message;
        return;
    }
    reqStatus.innerHTML = "successfully retrieved image!"
    for(let i = 0; i<jsonData.data.length; i++)
    {
        const imgURL = jsonData.data[i].url;
        const imgNode = document.createElement('img');
        imgNode.src = imgURL;

        imgContainer.prepend(imgNode);

        // Scroll to the first image added only
        if (i === 0) {
            imgContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}