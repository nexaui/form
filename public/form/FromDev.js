const nexaUi = new NexaUI();
// Inisialisasi
 nexaUi.ScriptKey("From.js").then((key) => {
    nexaUi.createForm({
    formid: "contactForm",
    submitid: "contactForm-submit",
    credensial: "BC948-67AB6-EA185-1001B",
    argument:key.uid,
    method: "formSend",
    validasi: {
        name: [3],
    },
  },
  (result) => {
    // Akan dipanggil setiap kali ada response baru
    console.log(result.response);
  }
);
   console.log(key.uid);
});

