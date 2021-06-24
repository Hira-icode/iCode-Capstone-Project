onload = async () => {
  const formFeedback = document.getElementById("customer_feedback_form");
  const yourName = document.getElementById("name");
  const yourEmail = document.getElementById("email");
  const comments = document.getElementById("comments");

  function onPageInit() {
    getFeedbacks()
      .then((feedbacks) => displayFeedbacksOnThePage(feedbacks))
      .catch((e) => console.log(e));
  }

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

  async function getFeedbacks() {
    try {
      const response = await fetch(
        "http://localhost:3001/api/CustomerFeedback"
      );

      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      return await response.json();
    } catch (e) {
      alert(e);
    }
  }

  function displayFeedbacksOnThePage(feedbacks) {
    const fb1 = {
      comments:
        "I bought a plot in Kingdom Valley Islamabad. The organizational culture is up to the mark.",
      name: "- Alia Khan",
    };
    const fb2 = {
      comments:
        "I am not a fan of real estate agents. I never feel that I can rely on them. However, Ghar Khareedo changed my perception of the field.",
      name: "- Mubeen Chaudhary",
    };
    const fb3 = {
      comments:
        "I bought a 5 Marla villa in Icon Valley Phase 1 with Ghar Khareedo and I felt that the company is much loyal to its customer's need.",
      name: "- Hina Ali",
    };
    const fb4 = {
      comments:
        "I have shared my idea of a dream home and saw Ghar Khareedo build it into a beautiful reality.",
      name: "- Rabia Jamshed",
    };
    const feedbacksPlaceholder = [fb1, fb2, fb3, fb4];
    if (!feedbacks || feedbacks.length == 0) {
      feedbacks = feedbacksPlaceholder 
    } 
    else if (feedbacks.length <4 ){
      let currentFeedbacklength = feedbacks.length
      feedbacks = [...feedbacks, ...feedbacksPlaceholder.slice(0, 4-currentFeedbacklength)]
      
    }

      console.log(feedbacks)
      feedbacks.forEach((fb, i) => {
        const msg = document.getElementById(`msg-${i + 1}`);
        const name = document.getElementById(`name-${i + 1}`);
        msg.innerHTML = fb.comments;
        name.innerHTML = fb.name;
      });
    }
  

  formFeedback.onsubmit = async (e) => {
    e.preventDefault();

    console.log("form submit");
    if (isFormValid()) {
      // This is essentially getting all the form data and making like and object
      // such as:
      // {name: "hira", email: "myemail.com"} and so on
      const formData = new URLSearchParams(new FormData(formFeedback));

      let response = await fetch("http://localhost:3001/api/CustomerFeedback", {
        method: "POST",
        body: formData,
      });

      if (response.status == 200) {
        // display to the user that form was submitted successfully
        console.log("form submitted success");
        location.reload();
      }
    }
  };

  onPageInit();
};
