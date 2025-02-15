/**
 * Class From
 * Kelas untuk menangani inisialisasi dan setup form dengan NexaUI
 * Mendukung form biasa dan form dengan upload file
 */
class From {
  /**
   * Inisialisasi instance NexaUI
   */
  constructor() {
    this.nexaUi = new NexaUI();
  }

  /**
   * Menginisialisasi form dengan mengambil ScriptKey
   * dan melakukan setup form yang diperlukan
   * @throws {Error} Jika terjadi kesalahan saat inisialisasi
   */
  async initialize() {
    try {
      const key = await this.nexaUi.ScriptKey("From.js");
      // Setup multiple forms
      //this.setupContactForm(key);
      this.setupUploadsFile(key);
      console.log(key.uid);
    } catch (error) {
      console.error("Initialization error:", error);
    }
  }

  /**
   * Setup form kontak tanpa file upload
   * @param {Object} key - Object berisi uid dan informasi kredensial
   */
  setupContactForm(key) {
    this.nexaUi.createForm(
      {
        formid: "contactForm",
        submitid: "contactForm-submit",
        credensial: "BC948-67AB6-EA185-1001B",
        argument: key.uid,
        method: "formSend",
        validasi: {
          name: [3], // Minimal 3 karakter
        },
      },
      (result) => {
        // Callback untuk menangani response
        console.log(result.response);
      }
    );
  }

  /**
   * Setup form dengan fitur upload file
   * @param {Object} key - Object berisi uid dan informasi kredensial
   */
  setupUploadsFile(key) {
    this.nexaUi.createForm(
      {
        formid: "contactForm",
        submitid: "contactForm-submit",
        credensial: "BC948-67AB6-EA185-1001B",
        argument: key.uid,
        method: "formUploads",
        validasi: {
          name: [3], // Minimal 3 karakter
          attachment: [15], // Maksimal 15MB
        },
      },
      (result) => {
        // Callback untuk menangani response upload
        console.log("Uploads File response:", result.response);
      }
    );
  }
}

// Inisialisasi instance From dan jalankan
const form = new From();
form.initialize();
