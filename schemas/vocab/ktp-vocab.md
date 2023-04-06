# nik

nik represent person id card number

```
  "nik": 3123122809890001
```

# nama

nama represent person name

```
  "nama": "Alice"
```

# berlakuHingga

berlakuHingga represent person id card expired date

```
  "berlakuHingga": "SEUMUR-HIDUP"
```

# pekerjaan

pekerjaan represent person job

```
  "pekerjaan": "Karyawan Swasta"
```

# statusPerkawinan

statusPerkawinan represent person marriage status match with our enum

```
enum StatusPerkawinan {
  KAWIN,
  BELUM_KAWIN,
  CERAI_HIDUP,
  CERAI_MATI,
}
```

Value

```
  "statusPerkawinan": 0
```

# statusPerkawinanDetail

statusPerkawinanDetail represent person marriage status match with our enum value

```
  "statusPerkawinanDetail": "KAWIN"
```

# golonganDarah

golonganDarah represent person blood type match with our enum

```
enum GolonganDarah {
  A,
  B,
  AB,
  O,
}
```

Value

```
  "golonganDarah": 0,
```

# golonganDarahDetail

golonganDarahDetail represent person blood type match with our enum value

```
  "golonganDarahDetail": "A"
```

# agama

agama represent person religion match with our enum

```
enum Agama {
  ISLAM,
  KRISTEN,
  KATOLIK,
  HINDU,
  BUDHA,
  KONGHUCU,
}
```

Value

```
  "agama": 0
```

# agamaDetail

agamaDetail represent person religion match with our enum value

```
  "agamaDetail": "ISLAM"
```

# tanggalLahir

tanggalLahir represent person birth date format `yyyymmdd`

```
  "tanggalLahir": 19900131
```

# tempatLahir

tempatLahir represent person birth place

```
  "tempatLahir": "Jakarta"
```

# alamat

alamat represent person home address

```
  "alamat": "Jl. Surya"
```

# jenisKelamin

jenisKelamin represent person gender match with our enum

```
enum JenisKelamin {
  LAKI_LAKI,
  PEREMPUAN,
}
```

Value

```
  "jenisKelamin": 0
```

# jenisKelaminDetail

jenisKelaminDetail represent person gender match with our enum value

```
  "jenisKelaminDetail": "LAKI_LAKI"
```

# kecamatan

kecamatan represent person kecamatan

```
  "kecamatan": "Bekasi Selatan"
```

# kelurahanDesa

kelurahanDesa represent person kelurahan

```
  "kelurahanDesa": "Jakamulya"
```

# kewarganegaraan

kewarganegaraan represent person kewarganegaraan match with our enum

```
enum Kewarganegaraan {
  WNI,
  WNA,
}
```

Value

```
  "kewarganegaraan": 0
```

# kewarganegaraanDetail

kewarganegaraanDetail represent person kewarganegaraan match with our enum value

```
  "kewarganegaraanDetail": "WNI"
```

# kotaKabupaten

kotaKabupaten represent person kota or kabupaten

```
  "kotaKabupaten": "Bekasi"
```

# provinsi

provinsi represent person provinsi

```
  "provinsi": "Jawa Barat"
```

# rtRw

rtRw represent person rt rw with format `000/000`

```
  "rtRw": "010/013"
```
