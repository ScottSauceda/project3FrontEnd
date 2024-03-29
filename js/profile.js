document.addEventListener("DOMContentLoaded", () => {
    let user = JSON.parse(localStorage.getItem('foodieUser'));
    (
        async function getProfile() {
            if (user) {
                let token = user.token;
                // let r = await fetch('http://localhost:8080/congnizantp2_war/profile', {
                let r = await fetch('http://localhost:8080/users/profile', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
                    .then(res => res.json())
                    .then(res => {
                        document.getElementById("additionalEmail").value = res.email;
                        document.getElementById("userName").value = res.username;
                        document.getElementById("mobile").value = res.mobile;
                        document.getElementById("address").value = res.address;
                    })
                    .catch(e => console.log(e))
            }
        }
    )();


    document.getElementById('homeBtn').addEventListener('click', e => {
        e.preventDefault();
        window.location.href = 'index.html'
    });

    document.getElementById("updateBtn").addEventListener("click", event => {
        event.preventDefault();

        let addtionalEmail = document.getElementById("additionalEmail").value;
        let username = document.getElementById("userName").value;
        let mobile = document.getElementById("mobile").value;
        let address = document.getElementById("address").value;

        (function updateProfile() {
            fetch(`http://thesi.generalassemb.ly:8080/profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    "email": addtionalEmail,
                    "mobile": mobile,
                    "address": address,
                })
            }).then(r => {
                let select = document.getElementById("update");
                select.removeChild(select.lastChild);

                if (r.status === 200) {
                    // window.location.reload();
                    let inform = document.createElement("p");
                    let textInform = document.createTextNode("Your profile has been updated!");
                    inform.appendChild(textInform);

                    document.getElementById("update").appendChild(inform);
                }
            })
        })()
    })
});
