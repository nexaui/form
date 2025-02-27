/**
 * Class untuk mengelola event dan interaksi UI
 */
class EventManager {
  /**
   * Inisialisasi EventManager
   */
  constructor() {
    this.nexaUi = new NexaUI();
    this.Storage = this.nexaUi.Client();
    this.CREDENTIALS = {
      READ: "BC948-67AB6-EA185-1001B",
      WRITE: "BC948-67AB6-EA185-1001B",
    };
    this.initializeComponents();
  }

  /**
   * Inisialisasi komponen-komponen yang diperlukan
   */
  initializeComponents() {
    // Inisialisasi NexaEvent
    this.even = this.nexaUi.NexaEvent();
    this.registerEventHandlers();

    // Inisialisasi NexaDom
    this.domInstance = this.nexaUi.NexaDom(this.getDomConfig());
    this.loadInitialData();
  }

  /**
   * Mendaftarkan event handlers
   */
  registerEventHandlers() {
    this.even.register({
      fromAdd: this.fromAdd.bind(this),
      fromUpdate: this.fromUpdate.bind(this),
      fromDelete: this.fromDelete.bind(this),
    });
    this.even.Handler();
  }

  /**
   * Mendapatkan konfigurasi untuk NexaDom
   * @returns {Object} Konfigurasi DOM
   */
  getDomConfig() {
    return {
      elementById: "item",
      sortOrder: "DESC",
      search: "searchInput",
      sortBy: "id",
      virtualScroll: true,
      chunkSize: 1000,
      pagination: "pagination",
      order: 2,
      searchableFields: ["nama", "id"],
    };
  }

  /**
   * Helper method untuk melakukan request ke Buckets
   * @param {string} action - Tipe aksi yang akan dilakukan
   * @param {Object} data - Data yang akan dikirim
   * @param {string} credential - Kredensial yang digunakan
   * @returns {Promise} Promise dari request
   */
  async sendBucketsRequest(action, data, credential = this.CREDENTIALS.WRITE) {
    try {
      const response = await this.Storage.Buckets({
        type: "nexa",
        action,
        credensial: credential,
        data,
      });

      // Reload DOM jika response berhasil
      if (response) {
        this.domInstance.Reload(response, {
          append: false,
          resetPage: true,
        });
      }

      return response;
    } catch (error) {
      console.error(`Error in ${action}:`, error);
      throw error;
    }
  }

  /**
   * Memuat data awal dari storage
   */
  async loadInitialData() {
    try {
      const response = await this.sendBucketsRequest(
        "data",
        false,
        this.CREDENTIALS.READ
      );
      this.domInstance.setData(response);
      console.log("Database Data:", response);
    } catch (error) {
      console.error("Error loading initial data:", error);
    }
  }

  /**
   * Handler untuk menambah data baru
   * @param {Object} data - Data dari form yang akan ditambahkan
   */
  fromAdd(data) {
    console.log("Data dari atribut:", data.attributes);
    $(data.attributes.setfrom.value).show();
    $(data.attributes.submit.value).show();

    this.nexaUi.createForm(
      {
        formid: data.attributes.setfrom.value,
        submitid: data.attributes.submit.value,
        validasi: {
          name: [3],
          attachment: [15],
        },
      },
      async (result) => {
        try {
          await this.sendBucketsRequest("formUploads", result.response);
          $(data.attributes.setfrom.value).hide();
          $(data.attributes.submit.value).hide();
        } catch (error) {
          // Error handling sudah ada di sendBucketsRequest
        }
      }
    );
  }

  /**
   * Handler untuk mengupdate data yang ada
   * @param {Object} data - Data yang akan diupdate
   */
  fromUpdate(data) {
    console.log("Data dari atribut:", data.attributes);
    const foundItem = this.domInstance.getData(data.id);
    console.log(foundItem);
    $(data.attributes.setfrom.value).show();
    $(data.attributes.submit.value).show();

    this.nexaUi
      .createForm(
        {
          formid: data.attributes.setfrom.value,
          submitid: data.attributes.submit.value,
          validasi: {
            name: [3],
            attachment: [15],
          },
          value: {
            id: foundItem.data.id,
            file: foundItem.data.images,
          },
        },
        async (result) => {
          try {
            await this.sendBucketsRequest("formUpdate", result.response);
            $(data.attributes.setfrom.value).hide();
            $(data.attributes.submit.value).hide();
          } catch (error) {
            // Error handling sudah ada di sendBucketsRequest
          }
        }
      )
      .then((form) => {
        form.setValues(foundItem.data);
      });
  }

  /**
   * Handler untuk menghapus data
   * @param {Object} data - Data yang akan dihapus
   */
  async fromDelete(data) {
    const foundItem = this.domInstance.getData(data.id);
    try {
      await this.sendBucketsRequest("formRemove", foundItem.data);
    } catch (error) {
      // Error handling sudah ada di sendBucketsRequest
    }
  }
}

// Inisialisasi EventManager
const eventManager = new EventManager();

// Export method yang diperlukan
export const { fromAdd, fromUpdate, fromDelete } = eventManager;
