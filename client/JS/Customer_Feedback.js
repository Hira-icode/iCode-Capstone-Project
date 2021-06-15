onload = async () => {
  const formFeedback = document.getElementById("customer_feedback_form");
  const yourName = document.getElementById("name");
  const yourEmail = document.getElementById("email");
  const comments = document.getElementById("comments");

  const msg1 = document.getElementById("msg-1");
  const name1 = document.getElementById("name-1");

  const msg2 = document.getElementById("msg-2");
  const name2 = document.getElementById("name-2");

  const msg3 = document.getElementById("msg-3");
  const name3 = document.getElementById("name-3");

  const msg4 = document.getElementById("msg-4");
  const name4 = document.getElementById("name-4");

  function isFormValid() {
    let isValid = false;
    if (
      yourName.value === "" ||
      yourEmail.value === "" ||
      comments.value === ""
    ) {
      alert("Please fill all the fields");
    } else if (yourName.value.length > 30) {
      alert("PLease check the length of the characters");
    } else if (comments.value.length < 30) {
      alert("Please check the minimum length of characters");
    } else {
      isValid = true;
      alert(
        `Your Name: ${yourName.value} \n Your Email: ${yourEmail.value} \n Your Comments: ${comments.value}`
      );
    }
    return isValid;
  }

  let getResponse = await fetch("http://localhost:3001/api/CustomerFeedback", {
    method: "GET",
  });

  let jsonRes = await getResponse.json();

  msg1.innerHTML = jsonRes[0].message;
  name1.innerHTML = jsonRes[0].name;

  msg2.innerHTML = jsonRes[1].message;
  name2.innerHTML = jsonRes[1].name;

  msg3.innerHTML = jsonRes[2].message;
  name3.innerHTML = jsonRes[2].name;

  msg4.innerHTML = jsonRes[3].message;
  name4.innerHTML = jsonRes[3].name;

  formFeedback.onsubmit = async (e) => {
    e.preventDefault();

    console.log("in form submit");
    if (isFormValid()) {
      // This is essentially getting all the form data and making like and object
      // such as:
      // {name: "ygor", email: "myemail.com"} and so on
      const formData = new URLSearchParams(new FormData(formFeedback));

      let response = await fetch("http://localhost:3001/api/CustomerFeedback", {
        method: "POST",
        body: formData,
      });

      if (response.status == 201) {
        // display to the user that form was submitted successfully
        console.log("form submitted success");
      }
    }
  };
};
