const urlInput = document.querySelector('#url');
const generateButton = document.querySelector('.generate-btn');
const qrImage = document.querySelector('.qr-img')
const cardResult = document.querySelector('.result')

const displayQrCode = (url) => {
    cardResult.classList.remove('dimmed')
    qrImage.src = url 

}

const sendQrCode = (params) => {
    const baseUrl = "https://api.qrserver.com/v1/create-qr-code/";
    const urlParams = new URLSearchParams(params).toString()
    const fullUrl = baseUrl + '?' + urlParams
    fetch(fullUrl)
    .then(response => {
        console.log(response);
        if(response.status !== 200){
            alert('error')
            return
        }else{
            displayQrCode(response.url)
        }
    })

}

generateButton.addEventListener('click', (e) => {
    const colorChoice = document.querySelector('input[name="color"]:checked').value;
    const params = {
        data: urlInput.value,
        size: '150x150',
        color: colorChoice,
    }
    sendQrCode(params)
})