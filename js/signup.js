
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("signupBtn").addEventListener("click", event => {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let addtionalEmail = document.getElementById("additionalEmail").value;
    let password = document.getElementById("password").value;
    let passwordConfirm = document.getElementById("passwordConfirm").value;
    let username = document.getElementById("userName").value;
    let mobile = document.getElementById("mobile").value;
    let address = document.getElementById("address").value;

    (function createSignup(){
      if (
          email !== "" &&
          password !== "" &&
          passwordConfirm !== "" &&
          password === passwordConfirm
      ) {
        console.log("everythings matches")
        // fetch("http://localhost:8080/congnizantp2_war/user/signup", {
        fetch("http://localhost:8080/users/create", {
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({
            email: `${email}`,
            password: `${password}`,
            username: `${username}`
          })
        })
            .then(res => res.json())
            .then(res => {
              localStorage.setItem("foodieUser",JSON.stringify(res));
              createProfile(res.token);
            })
            .catch(res => {
              console.log("Error:" + res);
            });
            console.log(localStorage)
      }
      else{
        alert("please enter again!");
      }
    })();

    function createProfile(token) {
      // fetch("http://localhost:8080/congnizantp2_war/profile", {
      fetch("http://localhost:8080/users/profile", {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        method: "POST",
        body: JSON.stringify({
          "email" : addtionalEmail,
          "mobile" : mobile,
          "address" : address
        })
      })
          .then(res => {
            if (res.status === 200){
              window.location.href = 'index.html'
            }
          })
          .catch(res => {
            console.log("Error:" + res);
          });
    }
  });
});
