
// Inisialisasi
const nexaUi = new NexaUI();
const Storage = nexaUi.Client();
nexaUi.createForm(
  {
    formid: "contactForm",
    submitid: "contactForm-submit",
    validasi: {
      name: [3],
      attachment: [15], // Maximum 15MB
    }
  },
  (result) => {
    console.log(result)
    
}).then(form => {
    form.setValues({
        name: "Hello net",
    });
});





nexaUi.createForm(
  {
    formid: "contactForm",
    submitid: "contactForm-submit",
     validasi: {
      name: [3],
      attachment: [15], // Maximum 15MB
    },
    value:{
      id:112
    }
  },
  (result) => {
    console.log(result)
    
})