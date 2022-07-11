let errors = new Array();
let res = new Array();
const form=document.querySelector("form");
form.addEventListener("submit", (e)=>{
  e.preventDefault();
  let name = document.forms['myForm']["name"].value;
  let email = document.forms['myForm']["email"].value;
  let date = document.forms['myForm']["date"].value;
  let phone = document.forms['myForm']["phone"].value;
  let time = document.forms['myForm']["time"].value;
  let count = document.forms['myForm']["people"].value;
  if (validateForm()) {
    res = get_Data();
    res.push({ 'Name': name, 'Email': email, 'Phone': phone, 'Date': date, 'time': time, 'count': count });
    set_Data(res);
    alert("Your Resveration is booked");
  }
})

function get_Data() {
  return JSON.parse(localStorage.getItem("Reservation")) ? JSON.parse(localStorage.getItem("Reservation")) : []
}
function set_Data(arr) {
  localStorage.setItem("Reservation", JSON.stringify(arr));
}

function seterror(id, error){
  //sets error inside tag of id 
  element = document.getElementById(id);
  element.getElementsByClassName('formerror')[0].innerHTML = error;

}
function clearErrors(){

  errors = document.getElementsByClassName('formerror');
  for(let item of errors)
  {
      item.innerHTML = "";
  }}

function validateForm() {
  let returnval = true;
  clearErrors();
  let name = document.forms['myForm']["name"].value;
  if (name.length<3) {
    seterror("name","*Length of name is too short");
    returnval = false;
  }
  if (name.length>20) {
    seterror("name","*Length of name is too long");
    returnval = false;
  }
  let email = document.forms['myForm']["email"].value;
  if (email.length < 8) {
    seterror("email","*Length of email is too short");
    returnval = false;
  }
  if (email.length < 25) {
    seterror("email","*Length of email is too long");
    returnval = false;
  }

  let phone = document.forms['myForm']["phone"].value;
  if (phone.length != 10) {
    seterror("phone","*Phone No. should be 10 digits");
    returnval = false;
  }
    //date validation
  let date = document.forms['myForm']["date"].value;
      const res_date=date.split("-");
      const d=new Date();
      let y=d.getFullYear();
      let m=d.getMonth()+1;
      let days=new Date(y,m,0).getDate();
      let dt=d.getDate();
      if (y>res_date[0]){
        seterror("date","*Reservation can only be made in the current year");
        returnval = false;
      }
      if (y<res_date[0]){
        seterror("date","*Reservation year cannot be from the past");
        returnval = false;
      }
      if (res_date[1]<1){
        seterror("date","*Reservation month cannot be less than 1");
        returnval = false;
      }
      if (res_date[1]>12){
        seterror("date","*Reservation month cannot be more than 12");
        returnval = false;
      }
      if (res_date[1]<m){
        seterror("date","*Reservation month cannot be from the past");
        returnval = false;
      }
      if (res_date[1]>m&&dt<res_date[2]){
        seterror("date","*Reservation month cannot be for more a month into the future");
        returnval = false;
      }
      if (res_date[2]<1){
        seterror("date","*Reservation Date cannot be less than 1");
        returnval = false;
      }
      if (res_date[2]>31){
        seterror("date","*Reservation Date cannot be more than 31");
        returnval = false;
      }
      if (res_date[2]>days){
        seterror("date","*Reservation Date cannot be more than in that month");
        returnval = false;
      }
      let time = document.forms['myForm']["time"].value;
      const hm=time.split(":");
      if(parseInt(hm[0])<9){
        seterror("time","Time of Reservation can only be after 9:00am")
        returnval = false;  
      }
      if(parseInt(hm[0])>22){
        seterror("time","Time of Reservation can only be before 10:00pm")
        returnval = false;
      }
      //when booking less than 1 hour before closing time
      if(parseInt(hm[0])==21 & parseInt(hm[1])>0){
        seterror("time","Plz make a reservation atleast 1 hour before closing")
        returnval = false;
      }


  let people = document.forms['myForm']["people"].value;
  if (people< 1) {
    seterror("people","*1 More people are needed for reservation");
    returnval = false;
  }
  if (people >25 ) {
    seterror("people","*25 people is the maximum allowed for reservation");
    returnval = false;
  }

  return returnval;
}
