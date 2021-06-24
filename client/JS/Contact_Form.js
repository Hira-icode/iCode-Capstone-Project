onload = () => {
  const formContact = document.getElementById("contact-form");
  const yourName = document.getElementById("name");
  const yourEmail = document.getElementById("email");
  const phoneNumber = document.getElementById("number");
  const message = document.getElementById("message");

  function isFormValid() {
    let isValid = false;
    if (
      yourName.value === "" ||
      yourEmail.value === "" ||
      phoneNumber.value === "" ||
      message.value === ""
    ) {
      alert("Please fill all the fields");
    } else if (yourName.value.length > 30) {
      alert("PLease check the length of the characters");
    } else if (phoneNumber.value.length !== 10) {
      alert("Please check length of the mobile number");
    } else if (isNaN(phoneNumber.value)) {
      alert("Please check the number. It should be only number");
    } else if (message.value.length > 300) {
      alert("Please check the maximum length of characters");
    } else {
      isValid = true;
      alert(
        `Your Name: ${yourName.value} \n Your Email: ${yourEmail.value} \n Your Phone Number: ${phoneNumber.value} \n Your Message: ${message.value}`
      );
    }
    return isValid;
  }

  formContact.onsubmit = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      // This is essentially getting all the form data and making like and object
      // such as:
      // {name: "hira", email: "myemail.com"} and so on
      const formData = new URLSearchParams(new FormData(formContact));

      let response = await fetch("http://localhost:3001/api/contactus", {
        method: "POST",
        body: formData,
      });

      if (response.status == 200) {
        // display to the user that form was submitted successfully
        console.log("form submitted success", response);
        yourName.value = "";
        yourEmail.value = "";
        phoneNumber.value = "";
        message.value = "";
      }
    }
  };
};
