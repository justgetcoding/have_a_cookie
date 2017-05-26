function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(function () {
    let outputDiv = document.getElementById('output')
    let xhrButton = document.getElementById('xhrRequest')


    if (document.cookie) {
        outputDiv.textContent = document.cookie
    }

    xhrButton.addEventListener('click', function () {

        var request = new XMLHttpRequest();
        request.open('GET', '/data', true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                var data = JSON.parse(request.responseText);
            } else {
                alert('Some XHR Error')
            }
        };

        request.onerror = function () {
            alert('Some XHR Connection Error')
        };

        request.send();
    })
})

