/** processForm: get data from form and make AJAX call to our API. */
BASE_URL = "http://localhost:5000/api";

async function processForm(evt) {
  evt.preventDefault();
  
  
  let data = {};
  
  let name = $("#name").val();
  let year = $("#year").val();
  let email = $("#email").val();
  let color = $("#color").val();
  //Serialize the variables to JSON format.

  //Error handling of data
  errs= handleInputData(name, year, email, color);
 
  
  if (errs) {
    for (err in errs["Errors"]){
    $(`#${err}-err`).html(`<p>${errs["Errors"][`${err}`]}</p>`);
    }
    const resp = await axios({
        url: `${BASE_URL}/lucky-num`,
        method: "POST",
        data: errs,
      });
} 
else {
    data = { name: name, year: year, email: email, color: color };
    
    const resp = await axios({
      url: `${BASE_URL}/lucky-num`,
      method: "POST",
      data: data,
    });
  }
}

function handleInputData(name, year, email, color) {
  const colors = ["blue", "orange", "red", "green"];
  let errs = {"Errors": {}};
  if (name == ""){
    errs["Errors"]["name"] = "Enter a Name";
  }
  if (year == ""){
    errs["Errors"]["year"] = "Enter a year";
  }
  if (email == ""){
    errs["Errors"]["email"] = "Enter an email address";
  }
  if (color == ""){
    errs["Errors"]["color"] = "Enter a color";
  }
  if (!colors.includes(color)) {
    errs["Errors"]["color"] = "Choose the correct color";
  }
  if (parseInt(year) < 1900 || parseInt(year) > 2000) {
    errs["Errors"]["year"] = "Enter a year between 1900 and 2000";
  }
   return errs;
}

function handleResponse(resp) {}
$("#form").on("submit", processForm);
