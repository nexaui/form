/**
 * Inisialisasi komponen UI dan storage ES6
 */
const nexaUi = new NexaUI();
const Storage = nexaUi.Client();

/**
 * Inisialisasi NexaEvent dan mendaftarkan handler
 */
const even = nexaUi.NexaEvent();
even.register({
  fromAdd: fromAdd,
  fromUpdate: fromUpdate,
  fromDelete: fromDelete,
});
even.Handler();

/**
 * Konfigurasi untuk NexaDom
 */
const config = {
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

/**
 * Inisialisasi DOM dan mengambil data dari storage
 */
const domInstance = nexaUi.NexaDom(config);
Storage.Buckets({
  type: "nexa",
  action: "data",
  credensial: "B8512-7A66D-9149B-A5927",
  data: false,
})
  .then((response) => {
    domInstance.setData(response);
    console.log("Database Data:", response);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

export async function sendBucketsRequest(action, data) {
  try {
    const response = await Storage.Buckets({
      type: "nexa",
      action,
      credensial: "B8512-7A66D-9149B-A5927",
      data,
    });

    // Reload DOM jika response berhasil
    if (response) {
      domInstance.Reload(response, {
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
 * Handler untuk menambah data baru
 * @param {Object} data - Data dari form yang akan ditambahkan
 */
export function fromAdd(data) {
  console.log("Data dari atribut:", data.attributes);
  $(data.attributes.setfrom.value).show();
  $(data.attributes.submit.value).show();

  nexaUi.createForm(
    {
      formid: data.attributes.setfrom.value,
      submitid: data.attributes.submit.value,
      validasi: {
        name: [3],
        attachment: [15], // Maximum 15MB
      },
    },
    (result) => {
      sendBucketsRequest('formUploads',result.response);
      $(data.attributes.setfrom.value).hide();
      $(data.attributes.submit.value).hide();
    
    }
  );
}

/**
 * Handler untuk mengupdate data yang ada
 * @param {Object} data - Data yang akan diupdate
 */
export function fromUpdate(data) {
  const foundItem = domInstance.getData(data.id);
  $(data.attributes.setfrom.value).show();
  $(data.attributes.submit.value).show();
  nexaUi
    .createForm(
      {
        formid: data.attributes.setfrom.value,
        submitid: data.attributes.submit.value,
        validasi: {
          name: [3],
          attachment: [15], // Maximum 15MB
        },
        value: {
          id: foundItem.data.id,
          file: foundItem.data.images,
        },
      },
      (result) => {
         sendBucketsRequest('formUpdate',result.response);
         $(data.attributes.setfrom.value).hide();
         $(data.attributes.submit.value).hide();

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
export function fromDelete(data) {
  const foundItem = domInstance.getData(data.id);
  sendBucketsRequest('formRemove',foundItem.data);
}
