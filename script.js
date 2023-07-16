const urlInput = document.querySelector('#url');
const generateButton = document.querySelector('.generate-btn');
const qrImage = document.querySelector('.qr-img')
const cardResult = document.querySelector('.result')

const displayQrCode = (url) => {
       qrImage.onload = () => {
         cardResult.classList.remove("dimmed");
       };
      qrImage.src = url 
}

const sendQrCode = (params) => {
    const baseUrl = "https://api.qrserver.com/v1/create-qr-code/";
    const urlParams = new URLSearchParams(params).toString()
    const fullUrl = baseUrl + '?' + urlParams
    fetch(fullUrl)
    .then(response => {
        console.log(response);
        if(response.ok){
            displayQrCode(response.url)
        }else{
            alert("An error occurred. Please try again later.");
            throw new Error("Error: " + response.status);
        }
    })

}

generateButton.addEventListener('click', (e) => {
    if(!urlInput.value){
        alert("Please enter a URL");
        return
    }
    const colorChoice = document.querySelector('input[name="color"]:checked').value;
    const params = {
        data: urlInput.value,
        size: '150x150',
        color: colorChoice,
    }
    urlInput.value = ''
    sendQrCode(params)
})
