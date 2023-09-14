const input = document.querySelector('input');
const button = document.querySelector('button');
const message = document.querySelector('.message');
const baseUrl = '/getData?number=';


button.addEventListener('click', async (e) => {
    const inputData = input.value;
    message.classList.remove('f:red-60');
    message.innerText = ""; //clear the msg text
    const buttonText = button.innerText

    //give button a loading state and lock the button
    button.innerText = "Loading..."
    button.disabled = true;
    button.classList.add("opacity:70%");

    try {

        //make a request to the backend
        const request = await fetch(baseUrl + inputData);
        const data = await request.text();
        //if request.status is bigger than 200, it's an error
        if (request.status > 200) throw (data);
        console.log(data);

        //if succeed, show the backend respond
        message.innerText = data;

    } catch (e) {

        //handle the error
        console.log(e);
        message.classList.add('f:red-60');
        message.innerText = 'An error occurred: ' + e;

    } finally {

        //recover button from the loading state
        button.innerText = buttonText;
        button.disabled = false;
        button.classList.remove("opacity:70%");
    }


})

//additional simulate the form "Enter" action
input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        button.click();
    }
});