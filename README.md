# @nexaui/form

Form components library untuk NexaUI framework.

## Instalasi

```bash
 nexa i pckg@nexaui/form
```

## Components

### TextInput
Component input text dengan berbagai fitur.

#### Props
- `label` - Label untuk input field
- `type` - Tipe input (text, email, password, dll)
- `name` - Nama field (wajib)
- `placeholder` - Placeholder text
- `required` - Field wajib diisi (boolean)
- `value` - Nilai default input
- `onChange` - Handler untuk perubahan nilai
- `disabled` - Menonaktifkan input (boolean)

### FileInput 
Component upload file dengan preview dan drag & drop.

#### Props
- `label` - Label untuk input file
- `dragDrop` - Mengaktifkan fitur drag & drop (boolean)
- `multiple` - Mengizinkan upload multiple file (boolean)
- `preview` - Menampilkan preview file (boolean)
- `name` - Nama field (wajib)
- `accept` - Tipe file yang diizinkan (contoh: "image/*,application/pdf")
- `maxSize` - Ukuran maksimal file dalam MB
- `onChange` - Handler ketika file dipilih

## Penggunaan

```jsx
// Form dengan TextInput
<form id="contactForm">
  <TextInput 
    label="Nama Lengkap"
    type="text"
    name="fullName"
    placeholder="Masukkan nama lengkap"
    required={true}
  />

  <TextInput 
    label="Email"
    type="email" 
    name="email"
    placeholder="contoh@email.com"
  />

  <FileInput 
    label="Upload Dokumen"
    dragDrop={true}
    multiple={true}
    preview={true}
    name="documents"
    accept="image/*,application/pdf"
    maxSize={5} // 5MB
  />

  <button type="submit" className="nx-btn-primary">
    Simpan
  </button>
</form>
```

## Styling
Component menggunakan class styling default NexaUI:

- `.nx-input` - Style dasar untuk input fields
- `.nx-input-label` - Style untuk label
- `.nx-btn-primary` - Style untuk tombol primary
- `.nx-file-drop` - Style untuk area drag & drop
- `.nx-file-preview` - Style untuk preview file

## Event Handling

```jsx
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
```

## Dokumentasi
Dokumentasi lengkap dapat dilihat di [https://tatiye.net/docs/form](https://tatiye.net/docs/form)

## Lisensi
MIT License - Copyright (c) 2024 NexaUI
